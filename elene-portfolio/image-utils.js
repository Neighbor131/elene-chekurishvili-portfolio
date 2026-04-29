const PortfolioImages = (() => {
  const optimizedHost = !["", "localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  const canOptimize = window.location.protocol.startsWith("http") && optimizedHost;
  const remoteImageHosts = ["miro.medium.com", "cdn-images-1.medium.com"];

  function isOptimizable(src) {
    if (!canOptimize || !src || src.startsWith("data:") || src.startsWith("blob:")) {
      return false;
    }

    if (src.startsWith("./assets/") || src.startsWith("/assets/") || src.startsWith("assets/")) {
      return true;
    }

    try {
      return remoteImageHosts.includes(new URL(src, window.location.href).hostname);
    } catch {
      return false;
    }
  }

  function sourcePath(src) {
    if (src.startsWith("./")) {
      return `/${src.slice(2)}`;
    }

    if (src.startsWith("assets/")) {
      return `/${src}`;
    }

    return src;
  }

  function imageUrl(src, width, options = {}) {
    if (!isOptimizable(src)) {
      return src;
    }

    const params = new URLSearchParams({
      url: sourcePath(src),
      w: String(width),
      q: String(options.quality || 74),
    });

    if (options.fit) {
      params.set("fit", options.fit);
    }

    return `/.netlify/images?${params.toString()}`;
  }

  function apply(img, src, options = {}) {
    const widths = options.widths || [480, 720, 960, 1280];
    img.src = imageUrl(src, options.width || widths[1] || 720, options);

    if (isOptimizable(src)) {
      img.srcset = widths.map((width) => `${imageUrl(src, width, options)} ${width}w`).join(", ");
      img.sizes = options.sizes || "100vw";
    }
  }

  return {
    apply,
    imageUrl,
  };
})();
