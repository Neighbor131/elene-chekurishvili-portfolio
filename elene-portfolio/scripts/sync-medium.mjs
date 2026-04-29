import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";

const feedUrl = process.argv[2] || process.env.MEDIUM_FEED_URL;
const siteRoot = new URL("../", import.meta.url);
const articleDir = new URL("articles/", siteRoot);
const overridesUrl = new URL("data/article-overrides.json", siteRoot);
const archiveUrl = new URL("data/medium-archive.json", siteRoot);

if (!feedUrl) {
  console.error("Usage: node scripts/sync-medium.mjs https://medium.com/feed/@username");
  process.exit(1);
}

const overrides = await readOverrides();
const archiveSeeds = await readArchiveSeeds();
const response = await fetch(feedUrl);

if (!response.ok) {
  throw new Error(`Could not fetch Medium feed: ${response.status} ${response.statusText}`);
}

const xml = await response.text();
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);

await mkdir(articleDir, { recursive: true });

const articles = [];
const seenPostIds = new Set();

for (const item of items) {
  const title = decodeEntities(readTag(item, "title"));
  const mediumUrl = normalizeMediumUrl(decodeEntities(readTag(item, "link")));
  const postId = extractPostId(mediumUrl);
  const pubDate = decodeEntities(readTag(item, "pubDate"));
  const creator = decodeEntities(readNamespacedTag(item, "dc:creator"));
  const rawContent = readNamespacedTag(item, "content:encoded") || readTag(item, "description");

  if (postId) {
    seenPostIds.add(postId);
  }

  articles.push(await buildArticle({
    title,
    mediumUrl,
    source: creator || "Medium",
    publishedAt: pubDate ? new Date(pubDate).toISOString() : "",
    rawContent,
  }));
}

for (const seed of archiveSeeds) {
  const mediumUrl = normalizeMediumUrl(seed.url);
  const postId = extractPostId(mediumUrl);

  if (postId && seenPostIds.has(postId)) {
    continue;
  }

  try {
    const readerArticle = await fetchReaderArticle(mediumUrl);
    const article = await buildArticle({
      title: readerArticle.title || seed.title || "Untitled article",
      mediumUrl,
      source: seed.source || "Elenee Ch",
      publishedAt: readerArticle.publishedAt || seed.publishedAt || "",
      rawContent: readerArticle.contentHtml,
      cover: readerArticle.cover || seed.cover || "",
    });

    articles.push(article);
    if (postId) {
      seenPostIds.add(postId);
    }
  } catch (error) {
    const cachedArticle = await readCachedArticle(mediumUrl);
    if (cachedArticle) {
      articles.push(applyOverrideToCachedArticle(cachedArticle));
      if (postId) {
        seenPostIds.add(postId);
      }
      console.warn(`Used cached local article for archive article ${mediumUrl}: ${error.message}`);
      continue;
    }

    if (seed.title && seed.publishedAt) {
      articles.push(buildExternalArchiveArticle(seed, mediumUrl));
      if (postId) {
        seenPostIds.add(postId);
      }
      console.warn(`Used external fallback for archive article ${mediumUrl}: ${error.message}`);
      continue;
    }

    console.warn(`Skipped archive article ${mediumUrl}: ${error.message}`);
  }
}

articles.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));

const output = `const articles = ${JSON.stringify(articles, null, 2)};\n`;
await writeFile(new URL("data/articles.js", siteRoot), output);

console.log(`Synced ${articles.length} Medium article${articles.length === 1 ? "" : "s"} to data/articles.js`);
console.log(`Generated ${articles.length} local article page${articles.length === 1 ? "" : "s"} in articles/`);

async function readOverrides() {
  try {
    return JSON.parse(await readFile(overridesUrl, "utf8"));
  } catch {
    return {};
  }
}

async function readArchiveSeeds() {
  try {
    const data = JSON.parse(await readFile(archiveUrl, "utf8"));
    return Array.isArray(data.articles) ? data.articles : [];
  } catch {
    return [];
  }
}

async function buildArticle({ title, mediumUrl, source, publishedAt, rawContent, cover }) {
  const override = overrides[mediumUrl] || overrides[extractPostId(mediumUrl)] || {};
  const articleTitle = override.title || title;
  const slug = override.slug || slugify(articleTitle);
  const manualContentHtml = override.manualContentPath ? await readManualContent(override.manualContentPath) : "";
  const originalCover = override.originalCover || cover || extractCover(rawContent);
  const cardCover = override.customCover || override.cover || originalCover;
  const contentHtml = manualContentHtml || removeDuplicateCover(sanitizeArticleHtml(rawContent), originalCover);

  if (isSecurityChallengeArticle(articleTitle, contentHtml)) {
    throw new Error(`reader returned a security verification page for ${mediumUrl}`);
  }

  const localHref = `./articles/${slug}.html`;
  const excerpt = override.excerpt || createExcerpt(contentHtml);

  const article = {
    title: articleTitle,
    href: localHref,
    mediumUrl,
    cover: cardCover,
    originalCover,
    ratio: override.ratio || "4 / 3",
    source,
    excerpt,
    publishedAt,
    slug,
  };

  await writeFile(new URL(`${slug}.html`, articleDir), renderArticlePage({ ...article, contentHtml }));
  return article;
}

async function readManualContent(path) {
  const cleanPath = path.replace(/^\.\//, "");
  return (await readFile(new URL(cleanPath, siteRoot), "utf8")).trim();
}

function buildExternalArchiveArticle(seed, mediumUrl) {
  const override = overrides[mediumUrl] || overrides[extractPostId(mediumUrl)] || {};
  const title = override.title || seed.title;

  return {
    title,
    href: mediumUrl,
    mediumUrl,
    cover: override.customCover || override.cover || seed.cover || "",
    originalCover: seed.cover || "",
    ratio: override.ratio || "4 / 3",
    source: seed.source || "Elenee Ch",
    excerpt: override.excerpt || seed.excerpt || "",
    publishedAt: seed.publishedAt,
    slug: override.slug || slugify(title),
  };
}

async function readCachedArticle(mediumUrl) {
  const files = await readdir(articleDir);

  for (const file of files.filter((name) => name.endsWith(".html"))) {
    const html = await readFile(new URL(file, articleDir), "utf8");

    if (!html.includes(mediumUrl)) {
      continue;
    }

    const title = decodeEntities(html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "").trim() || "");
    const meta = decodeEntities(html.match(/<p class="article-meta">([\s\S]*?)<\/p>/)?.[1]?.replace(/<[^>]+>/g, "").trim() || "");
    const [publishedLabel = "", source = "Elenee Ch"] = meta.split(" · ");
    const publishedAt = publishedLabel ? new Date(publishedLabel).toISOString() : "";
    const excerpt = decodeEntities(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || "");
    const originalCover = html.match(/<figure class="article-cover"><img src="([^"]+)"/)?.[1] || "";

    return {
      title,
      href: `./articles/${file}`,
      mediumUrl,
      cover: originalCover,
      originalCover,
      ratio: "4 / 3",
      source,
      excerpt,
      publishedAt,
      slug: file.replace(/\.html$/, ""),
    };
  }

  return null;
}

function applyOverrideToCachedArticle(article) {
  const override = overrides[article.mediumUrl] || overrides[extractPostId(article.mediumUrl)] || {};

  return {
    ...article,
    title: override.title || article.title,
    cover: override.customCover || override.cover || article.cover,
    ratio: override.ratio || article.ratio,
    excerpt: override.excerpt || article.excerpt,
    slug: override.slug || article.slug,
  };
}

async function fetchReaderArticle(url) {
  const readerUrl = `https://r.jina.ai/http://${url}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const response = await fetch(readerUrl, { signal: controller.signal });
  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(`reader returned ${response.status}`);
  }

  const text = await response.text();
  const title = text.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || "";
  const publishedTime = text.match(/^Published Time:\s*(.+)$/m)?.[1]?.trim() || "";
  const markdown = text.split("Markdown Content:\n").slice(1).join("Markdown Content:\n").trim();
  const cleanedMarkdown = cleanReaderMarkdown(markdown);

  if (isSecurityChallengeArticle(title, cleanedMarkdown)) {
    throw new Error("reader returned a security verification page");
  }

  return {
    title,
    publishedAt: publishedTime ? new Date(publishedTime).toISOString() : "",
    cover: extractMarkdownCover(cleanedMarkdown),
    contentHtml: markdownToHtml(cleanedMarkdown),
  };
}

function renderArticlePage(article) {
  const published = article.publishedAt
    ? new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(article.publishedAt))
    : "";
  const cover = article.originalCover || article.cover;
  const pageCover = cover.startsWith("./") ? `.${cover}` : cover;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeAttribute(article.excerpt)}" />
    <title>${escapeHtml(article.title)} | Elene Chekurishvili</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.hugeicons.com/font/icons.css" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header" aria-label="Primary navigation">
      <a class="brand-mark" href="../index.html" aria-label="Elene Chekurishvili home">
        <span class="brand-bar brand-bar-top"></span>
        <span class="brand-bar brand-bar-middle"></span>
        <span class="brand-bar brand-bar-bottom"></span>
      </a>
      <nav class="nav-links" aria-label="Site">
        <a href="../works.html">Works</a>
        <a href="../index.html#about">About</a>
        <a href="../articles.html">Articles</a>
        <a href="../contact.html">Contact</a>
      </nav>
    </header>

    <main id="top">
      <article class="article-page">
        <header class="article-header">
          <p class="article-meta">${escapeHtml([published, article.source].filter(Boolean).join(" · "))}</p>
          <h1>${escapeHtml(article.title)}</h1>
          <a class="medium-link" href="${escapeAttribute(article.mediumUrl)}" target="_blank" rel="noopener">
            <span>Read on Medium</span>
            <i class="hgi-stroke hgi-arrow-up-right-01 medium-link-icon" aria-hidden="true"></i>
          </a>
        </header>
        ${cover ? `<figure class="article-cover"><img src="${escapeAttribute(pageCover)}" alt="" /></figure>` : ""}
        <div class="article-rich-text">
          ${article.contentHtml}
        </div>
        <a class="medium-link article-end-link" href="${escapeAttribute(article.mediumUrl)}" target="_blank" rel="noopener">
          <span>Read on Medium</span>
          <i class="hgi-stroke hgi-arrow-up-right-01 medium-link-icon" aria-hidden="true"></i>
        </a>
      </article>
    </main>

    <div class="reading-progress" data-reading-progress role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">
      <span class="reading-progress-value" data-reading-progress-value>0%</span>
      <div class="reading-progress-control" aria-hidden="true">
        <svg class="reading-progress-ring" viewBox="0 0 48 48" role="presentation">
          <circle class="reading-progress-ring-track" cx="24" cy="24" r="18" stroke="currentColor" stroke-width="3" fill="none"></circle>
          <circle class="reading-progress-ring-meter" data-reading-progress-circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"></circle>
        </svg>
      </div>
    </div>

    <footer class="site-footer">
      <p>© 2026 Elene Chekurishvili</p>
      <nav aria-label="Connect links">
        <a href="mailto:el.chekurishvili@gmail.com">Email</a>
        <a href="https://medium.com/@elenech" target="_blank" rel="noopener">Medium</a>
        <a href="https://www.wonderer613.art/#" target="_blank" rel="noopener">Wonderer613</a>
      </nav>
      <div class="kofi-widget" aria-label="Support on Ko-fi">
        <script type="text/javascript" src="https://storage.ko-fi.com/cdn/widget/Widget_2.js"></script>
        <script type="text/javascript">kofiwidget2.init("What about coffee?", "#000000", "A0A61Y715P");kofiwidget2.draw();</script>
      </div>
      <p>Built with Codex</p>
    </footer>
    <script src="../article-toc.js"></script>
    <script src="../article-progress.js"></script>
  </body>
</html>
`;
}

function readTag(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`));
  return unwrapCdata(match?.[1] || "");
}

function readNamespacedTag(xml, tagName) {
  const escaped = tagName.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`));
  return unwrapCdata(match?.[1] || "");
}

function unwrapCdata(value) {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function extractCover(html) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] || "";
}

function sanitizeArticleHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<img[^>]+medium\.com\/_\/stat[^>]*>/gi, "")
    .replace(/\s(on\w+)=["'][^"']*["']/gi, "")
    .replace(/\sstyle=["'][^"']*["']/gi, "")
    .replace(/<a\s/gi, '<a target="_blank" rel="noopener" ')
    .trim();
}

function removeDuplicateCover(html, cover) {
  if (!cover) return html;

  const escapedCover = cover.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html
    .replace(new RegExp(`^<figure>\\s*<img[^>]*src=["']${escapedCover}["'][^>]*>\\s*<\\/figure>`, "i"), "")
    .replace(new RegExp(`(<\\/h[2-4]>)\\s*<figure>\\s*<img[^>]*src=["']${escapedCover}["'][^>]*>\\s*<\\/figure>`, "i"), "$1")
    .trim();
}

function createExcerpt(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).slice(0, 180);
}

function isSecurityChallengeArticle(title, content) {
  const combined = `${title} ${content}`.replace(/<[^>]+>/g, " ");
  return (
    /just a moment/i.test(title) ||
    /performing security verification/i.test(combined) ||
    /protect against malicious bots/i.test(combined)
  );
}

function normalizeMediumUrl(url) {
  return url.split("?")[0];
}

function extractPostId(url) {
  return url.match(/-([a-f0-9]{12})(?:$|[/?#])/i)?.[1] || "";
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80) || "article";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function cleanReaderMarkdown(markdown) {
  let lines = markdown.split(/\r?\n/);
  const hasMediumChrome = lines.some((line) => /Sitemap|Open in app|Sign up|Sign in/.test(line));

  if (hasMediumChrome) {
    const articleImageIndex = lines.findIndex((line) => {
      const image = line.match(/!\[[^\]]*]\(([^)]+)\)/);
      return image && !/resize:fill:(32|40|48|64|80|96):/i.test(image[1]);
    });

    if (articleImageIndex >= 0) {
      lines = lines.slice(articleImageIndex);
    }
  }

  const cleaned = [];
  let skipInboxBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const plainTrimmed = trimmed.replace(/^#{1,6}\s+/, "");

    if (/^Get Elenee Ch.?s stories in your inbox$/i.test(plainTrimmed)) {
      skipInboxBlock = true;
      continue;
    }

    if (skipInboxBlock) {
      if (!trimmed || /^Remember me/i.test(trimmed) || /^Join Medium/i.test(trimmed) || /^Subscribe$/i.test(trimmed)) {
        continue;
      }
      skipInboxBlock = false;
    }

    if (
      /Written by Elenee Ch/i.test(trimmed) ||
      /^Haya!/.test(trimmed) ||
      (cleaned.length > 0 && /medium\.com\/tag\//i.test(trimmed)) ||
      (cleaned.length > 0 && /medium\.com\/m\/signin/i.test(trimmed))
    ) {
      break;
    }

    if (/^(Listen|Share|Press enter or click to view image in full size|Zoom image will be displayed|Member-only)$/i.test(trimmed)) {
      continue;
    }

    if (/^(Subscribe|\[x\]|[-*]\s*\[x\]|Remember me for faster sign in)$/i.test(trimmed)) {
      continue;
    }

    cleaned.push(line);
  }

  return cleaned.join("\n").trim();
}

function extractMarkdownCover(markdown) {
  const images = [...markdown.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].map((match) => match[1]);
  return images.find((src) => !/resize:fill:(32|40|48|64|80|96):/i.test(src)) || "";
}

function markdownToHtml(markdown) {
  const blocks = [];
  const paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${formatInlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph.length = 0;
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(`<ul>${listItems.map((item) => `<li>${formatInlineMarkdown(item)}</li>`).join("")}</ul>`);
    listItems = [];
  };

  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const image = trimmed.match(/^!\[([^\]]*)]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      blocks.push(`<figure><img src="${escapeAttribute(image[2])}" alt="${escapeAttribute(image[1])}" /></figure>`);
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(heading[1].length + 1, 4);
      blocks.push(`<h${level}>${formatInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const quote = trimmed.match(/^>\s?(.+)$/);
    if (quote) {
      flushParagraph();
      flushList();
      blocks.push(`<blockquote>${formatInlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }

    const listItem = trimmed.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      listItems.push(listItem[1]);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks.join("");
}

function formatInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
