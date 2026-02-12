(() => {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const main = document.querySelector("main.main-content");
  if (!main) return;

  const targets = new Set();

  // Animate primary content blocks as you read/scroll.
  main.querySelectorAll(":scope > *").forEach((el) => targets.add(el));
  main.querySelectorAll(".faq-item, .form-field").forEach((el) => targets.add(el));

  const elements = Array.from(targets);

  elements.forEach((el, index) => {
    el.classList.add("reveal");

    if (!prefersReducedMotion) {
      const delayMs = Math.min(index * 45, 250);
      el.style.transitionDelay = `${delayMs}ms`;
    }
  });

  const show = (el) => {
    el.classList.add("is-visible");
  };

  if (prefersReducedMotion) {
    elements.forEach(show);
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach(show);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
})();
