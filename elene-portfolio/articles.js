const articleGrid = document.querySelector("#article-grid");
const emptyState = document.querySelector("#articles-empty");

function createArticleCard(article, index) {
  const link = document.createElement("a");
  link.className = "project-card is-linked";
  link.href = article.href;
  link.setAttribute("aria-label", `${article.title} article`);
  if (article.href.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noopener";
  }

  const figure = document.createElement("figure");
  figure.className = "project-cover";
  if (article.ratio) {
    figure.classList.add("has-ratio");
    figure.style.setProperty("--cover-ratio", article.ratio);
  }

  if (hasUsableCover(article.cover)) {
    const image = document.createElement("img");
    image.src = article.cover;
    image.alt = "";
    image.loading = index < 6 ? "eager" : "lazy";
    image.decoding = "async";
    figure.append(image);
  } else {
    figure.classList.add("article-cover-fallback");
    figure.textContent = article.title;
  }

  const title = document.createElement("h2");
  title.textContent = article.title;

  link.append(figure, title);
  return link;
}

function hasUsableCover(cover) {
  return Boolean(cover) && !/resize:fill:(32|38|40|48|64|80|96):/i.test(cover);
}

function renderArticles(items) {
  articleGrid.replaceChildren(...items.map(createArticleCard));
  emptyState.hidden = items.length > 0;
}

renderArticles(articles);
