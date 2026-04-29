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
  const role = document.querySelector("[data-work-role]");
  const focus = document.querySelector("[data-work-focus]");
  const year = document.querySelector("[data-work-year]");
  const media = document.querySelector("[data-work-media]");
  const liveLink = document.querySelector("[data-work-live-link]");

  document.title = `${project.title} | Elene Chekurishvili`;
  title.textContent = project.title;
  meta.textContent = [project.type, project.year].filter(Boolean).join(" · ");
  summary.textContent = project.summary;
  role.textContent = project.type;
  focus.textContent = project.focus || "UX/UI design, visual direction, digital product thinking";
  year.textContent = project.year;

  if (project.liveUrl) {
    liveLink.href = project.liveUrl;
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
      img.src = image.src;
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

if (workPage) {
  renderWorkPage(getCurrentProject());
}
