const articleContent = document.querySelector(".article-rich-text");

if (articleContent) {
  const headings = [...articleContent.querySelectorAll("h2, h3, h4")]
    .map((heading) => {
      const title = heading.textContent.trim().replace(/\s+/g, " ");

      return {
        element: heading,
        title,
        depth: Number(heading.tagName.slice(1)),
      };
    })
    .filter((item) => item.title.length > 0);

  if (headings.length > 1) {
    const usedIds = new Set();

    headings.forEach((item) => {
      if (!item.element.id) {
        item.element.id = createHeadingId(item.title, usedIds);
      } else {
        usedIds.add(item.element.id);
      }
    });

    const toc = document.createElement("nav");
    toc.className = "article-toc-minimap";
    toc.setAttribute("aria-label", "Article sections");

    const rail = document.createElement("div");
    rail.className = "article-toc-rail";
    rail.setAttribute("aria-hidden", "true");

    const list = document.createElement("ol");
    list.className = "article-toc-list";

    const links = headings.map((item) => {
      const marker = document.createElement("span");
      marker.className = `article-toc-marker article-toc-depth-${item.depth}`;
      rail.append(marker);

      const listItem = document.createElement("li");
      listItem.className = `article-toc-item article-toc-depth-${item.depth}`;

      const link = document.createElement("a");
      link.href = `#${item.element.id}`;
      link.textContent = item.title;
      link.setAttribute("aria-label", `Jump to ${item.title}`);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        history.pushState(null, "", link.hash);
        item.element.scrollIntoView({ behavior: "smooth" });
      });

      listItem.append(link);
      list.append(listItem);

      return { link, marker, heading: item.element };
    });

    const popover = document.createElement("div");
    popover.className = "article-toc-popover";
    popover.append(list);

    toc.append(rail, popover);
    document.body.append(toc);

    function setActiveLink() {
      let activeIndex = 0;
      const activationLine = window.innerHeight * 0.32;

      links.forEach((item, index) => {
        if (item.heading.getBoundingClientRect().top <= activationLine) {
          activeIndex = index;
        }
      });

      links.forEach((item, index) => {
        const isActive = index === activeIndex;
        item.link.classList.toggle("is-active", isActive);
        item.marker.classList.toggle("is-active", isActive);

        if (isActive) {
          item.link.setAttribute("aria-current", "true");
        } else {
          item.link.removeAttribute("aria-current");
        }
      });
    }

    setActiveLink();
    window.addEventListener("scroll", requestAnimationFrameOnce(setActiveLink), { passive: true });
    window.addEventListener("resize", requestAnimationFrameOnce(setActiveLink));
  }
}

function createHeadingId(title, usedIds) {
  const base =
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section";
  let id = base;
  let index = 2;

  while (usedIds.has(id) || document.getElementById(id)) {
    id = `${base}-${index}`;
    index += 1;
  }

  usedIds.add(id);
  return id;
}

function requestAnimationFrameOnce(callback) {
  let frameRequest = 0;

  return () => {
    if (frameRequest) {
      return;
    }

    frameRequest = window.requestAnimationFrame(() => {
      frameRequest = 0;
      callback();
    });
  };
}
