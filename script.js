// Pixel Bridge — site interactions

function initNav() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".navbar__links");
  const navbar = document.getElementById("site-nav");

  if (!hamburger || !navLinks) return;

  const setMenuOpen = (open) => {
    navLinks.classList.toggle("is-open", open);
    hamburger.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
  };

  hamburger.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("is-open"));
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.classList.contains("is-open")) return;
    if (hamburger.contains(e.target) || navLinks.contains(e.target)) return;
    setMenuOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
      setMenuOpen(false);
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
}

function initReveal() {
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.length < 2 || href.startsWith("#tally-")) return;

    link.addEventListener("click", (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.history.replaceState) {
        window.history.replaceState(null, "", href);
      }
    });
  });
}

function initFaq() {
  const items = document.querySelectorAll("details[name]");
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      const group = item.getAttribute("name");
      document.querySelectorAll(`details[name="${group}"]`).forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initSmoothAnchors();
  initFaq();
});
