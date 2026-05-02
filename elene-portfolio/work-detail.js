const workPage = document.querySelector("[data-work-page]");

function getProjectSlug(project) {
  return project.href.split("project=")[1] || "";
}

function getCurrentProject() {
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("project");
  return projects.find((project) => getProjectSlug(project) === requestedSlug) || projects[0];
}

function renderWorkPage(project) {
  const title = document.querySelector("[data-work-title]");
  const meta = document.querySelector("[data-work-meta]");
  const summary = document.querySelector("[data-work-summary]");
  const links = document.querySelector("[data-work-links]");
  const body = document.querySelector("[data-work-body]");
  const role = document.querySelector("[data-work-role]");
  const focus = document.querySelector("[data-work-focus]");
  const year = document.querySelector("[data-work-year]");
  const media = document.querySelector("[data-work-media]");
  const liveLink = document.querySelector("[data-work-live-link]");
  const liveLinkLabel = liveLink.querySelector("span");

  document.title = `${project.title} | Elene Chekurishvili`;
  title.textContent = project.title;
  meta.textContent = [project.type, project.year].filter(Boolean).join(" · ");
  summary.textContent = project.summary;
  renderWorkLinks(links, project.links);
  body.classList.toggle("is-rich", Boolean(project.bodyMarkdown));
  if (project.bodyMarkdown) {
    renderWorkMarkdown(body, project.bodyMarkdown);
    body.hidden = false;
  } else if (project.bodyText) {
    body.textContent = project.bodyText;
    body.hidden = false;
  } else {
    body.replaceChildren();
    body.hidden = true;
  }
  role.textContent = project.type;
  focus.textContent = project.focus || "UX/UI design, visual direction, digital product thinking";
  year.textContent = project.year;

  if (project.liveUrl) {
    liveLink.href = project.liveUrl;
    liveLinkLabel.textContent = project.liveLabel || "Visit live project";
    liveLink.hidden = false;
  } else {
    liveLink.hidden = true;
    liveLink.removeAttribute("href");
  }

  const imageSet = project.images || [
    {
      src: project.cover,
      label: "Overview",
    },
    {
      src: project.cover,
      label: "Interface direction",
    },
    {
      src: project.cover,
      label: "Visual system",
    },
  ];

  media.replaceChildren(
    ...imageSet.map((image) => {
      const figure = document.createElement("figure");
      figure.className = "work-shot";
      if (project.ratio) {
        figure.style.setProperty("--cover-ratio", project.ratio);
      }

      const img = document.createElement("img");
      PortfolioImages.apply(img, image.src, {
        width: 1400,
        widths: [720, 960, 1200, 1400, 1800],
        sizes: "(min-width: 900px) 58vw, 100vw",
        quality: 76,
      });
      img.alt = image.alt || `${project.title} ${image.label}`;
      img.loading = "lazy";
      img.decoding = "async";

      const caption = document.createElement("figcaption");
      caption.textContent = image.label;

      figure.append(img, caption);
      return figure;
    }),
  );
}

function renderWorkLinks(container, links = []) {
  if (!links.length) {
    container.replaceChildren();
    container.hidden = true;
    return;
  }

  container.replaceChildren(
    ...links.map((link) => {
      const anchor = document.createElement("a");
      anchor.className = "medium-link";
      anchor.href = link.href;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.textContent = link.label;
      return anchor;
    }),
  );
  container.hidden = false;
}

function renderWorkMarkdown(container, markdown) {
  const lines = markdown.trim().split(/\r?\n/);
  const nodes = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed === "---") {
      nodes.push(document.createElement("hr"));
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^##\s+(.+)$/);
    if (heading) {
      const node = document.createElement("h2");
      node.append(...createInlineNodes(heading[1]));
      nodes.push(node);
      index += 1;
      continue;
    }

    const unordered = trimmed.match(/^\*\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const list = document.createElement(unordered ? "ul" : "ol");
      const markerPattern = unordered ? /^\*\s+(.+)$/ : /^\d+\.\s+(.+)$/;

      while (index < lines.length) {
        while (!lines[index]?.trim()) {
          const nextListLine = lines.slice(index + 1).find((next) => next.trim());
          if (!nextListLine || !markerPattern.test(nextListLine.trim())) {
            break;
          }
          index += 1;
        }

        const itemMatch = lines[index].trim().match(markerPattern);
        if (!itemMatch) {
          break;
        }

        const item = document.createElement("li");
        item.append(...createInlineNodes(itemMatch[1]));
        index += 1;

        while (index < lines.length && /^\s{2,}\S/.test(lines[index])) {
          item.append(document.createElement("br"), ...createInlineNodes(lines[index].trim()));
          index += 1;
        }

        list.append(item);
      }

      nodes.push(list);
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length) {
      const nextLine = lines[index];
      const nextTrimmed = nextLine.trim();
      if (
        !nextTrimmed ||
        nextTrimmed === "---" ||
        /^##\s+/.test(nextTrimmed) ||
        /^\*\s+/.test(nextTrimmed) ||
        /^\d+\.\s+/.test(nextTrimmed)
      ) {
        break;
      }
      paragraphLines.push(nextTrimmed);
      index += 1;
    }

    const paragraph = document.createElement("p");
    paragraphLines.forEach((paragraphLine, paragraphIndex) => {
      if (paragraphIndex > 0) {
        paragraph.append(document.createElement("br"));
      }
      paragraph.append(...createInlineNodes(paragraphLine));
    });
    nodes.push(paragraph);
  }

  container.replaceChildren(...nodes);
}

function createInlineNodes(text) {
  const nodes = [];
  const strongPattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = strongPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    const strong = document.createElement("strong");
    strong.textContent = match[1];
    nodes.push(strong);
    lastIndex = strongPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(document.createTextNode(text.slice(lastIndex)));
  }

  return nodes;
}

if (workPage) {
  renderWorkPage(getCurrentProject());
}
