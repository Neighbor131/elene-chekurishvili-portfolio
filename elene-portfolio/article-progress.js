const article = document.querySelector(".article-page");
const progress = document.querySelector("[data-reading-progress]");
const progressValue = document.querySelector("[data-reading-progress-value]");
const progressCircle = document.querySelector("[data-reading-progress-circle]");

if (article && progress && progressValue && progressCircle) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const svgRadius = 18;
  const circumference = 2 * Math.PI * svgRadius;
  let frameRequest = 0;
  let previousPercent = -1;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let isDragging = false;

  progressCircle.style.strokeDasharray = String(circumference);
  progressCircle.style.strokeDashoffset = String(circumference);

  function getReadingProgress() {
    const articleTop = article.offsetTop;
    const articleBottom = articleTop + article.offsetHeight;
    const maxScroll = Math.max(articleBottom - window.innerHeight, articleTop + 1);
    const rawProgress = (window.scrollY - articleTop) / (maxScroll - articleTop);

    return Math.min(Math.max(rawProgress, 0), 1);
  }

  function renderProgress() {
    frameRequest = 0;

    const progressAmount = getReadingProgress();
    const percent = Math.round(progressAmount * 100);

    if (percent === previousPercent) {
      return;
    }

    previousPercent = percent;
    progressCircle.style.strokeDashoffset = String(circumference * (1 - progressAmount));
    progress.setAttribute("aria-valuenow", String(percent));
    progressValue.textContent = `${percent}%`;
  }

  function requestProgressUpdate() {
    if (frameRequest) {
      return;
    }

    frameRequest = window.requestAnimationFrame(renderProgress);
  }

  function setMotionPreference() {
    progress.classList.toggle("reduce-motion", prefersReducedMotion.matches);
  }

  function clampPosition(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  progress.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    const rect = progress.getBoundingClientRect();
    isDragging = true;
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;
    progress.classList.add("is-dragging");
    progress.setPointerCapture(event.pointerId);
  });

  progress.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    const x = clampPosition(event.clientX - dragOffsetX, 8, window.innerWidth - progress.offsetWidth - 8);
    const y = clampPosition(event.clientY - dragOffsetY, 8, window.innerHeight - progress.offsetHeight - 8);

    progress.style.left = `${x}px`;
    progress.style.top = `${y}px`;
    progress.style.right = "auto";
    progress.style.bottom = "auto";
  });

  progress.addEventListener("pointerup", (event) => {
    isDragging = false;
    progress.classList.remove("is-dragging");

    if (progress.hasPointerCapture(event.pointerId)) {
      progress.releasePointerCapture(event.pointerId);
    }
  });

  renderProgress();
  setMotionPreference();

  window.addEventListener("scroll", requestProgressUpdate, { passive: true });
  window.addEventListener("resize", requestProgressUpdate);
  window.addEventListener("load", requestProgressUpdate);

  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", setMotionPreference);
  } else if (typeof prefersReducedMotion.addListener === "function") {
    prefersReducedMotion.addListener(setMotionPreference);
  }
}
