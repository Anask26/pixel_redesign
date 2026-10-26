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


/* ========================================
   PIXEL BRIDGE — INTERACTIVE SERVICES
======================================== */

(() => {
  const serviceIndex = document.querySelector(".service-index");

  if (!serviceIndex) return;

  // Service content and corresponding image paths
  const options = [
    {
      number: "01",
      category: "WEBSITE DEVELOPMENT",

      title: "Websites built to do more than look good.",

      description:
        "We design and develop responsive websites that communicate your value, build trust, and help turn visitors into enquiries.",

      benefits: [
        "Responsive website design",
        "Clear, user-friendly layouts",
        "Basic technical and on-page SEO"
      ],

      caption: "Selected work · eCorner",

      image: "pictures/service-1.png",

      imageAlt: "eCorner electronics store website developed by Pixel Bridge"
    },

    {
      number: "02",
      category: "WEBSITE CARE & MAINTENANCE",

      title: "Your website shouldn't be forgotten after launch.",

      description:
        "We help keep your website updated and functional through agreed content changes, troubleshooting, and practical improvements.",

      benefits: [
        "Content and image updates",
        "Bug fixes and troubleshooting",
        "Ongoing improvements as agreed"
      ],

      caption: "Website care & maintenance",

      image: "pictures/service-2.png",

      imageAlt: "Website care and maintenance service preview"
    },

    {
      number: "03",
      category: "BUSINESS SOLUTIONS & STRATEGY",

      title: "Understand the problem before building.",

      description:
        "We help businesses review their online presence, identify areas for improvement, and consider practical digital solutions before committing to a build.",

      benefits: [
        "Website and digital experience reviews",
        "Customer journey improvements",
        "Practical recommendations"
      ],

      caption: "Our approach to digital strategy",

      image: "pictures/service-3.png",

      imageAlt: "Business solutions and digital strategy preview"
    },

    {
      number: "04",
      category: "WEBSITE REDESIGN & OPTIMISATION",

      title: "Make your existing website work better.",

      description:
        "We improve existing websites with clearer layouts, more consistent design, and responsive experiences suited to your business and visitors.",

      benefits: [
        "Layout and visual improvements",
        "Mobile responsiveness",
        "Usability and content refinements"
      ],

      caption: "Website redesign & optimisation",

      image: "pictures/service-4.png",

      imageAlt: "Website redesign and optimisation preview"
    }
  ];

  const buttons = [
    ...serviceIndex.querySelectorAll(".service-option")
  ];

  const art = serviceIndex.querySelector("#preview-art");

  const number = serviceIndex.querySelector("#preview-number");
  const category = serviceIndex.querySelector("#preview-category");
  const caption = serviceIndex.querySelector("#preview-caption");
  const title = serviceIndex.querySelector("#preview-title");
  const description = serviceIndex.querySelector("#preview-description");
  const benefits = serviceIndex.querySelector("#preview-benefits");

  // Find the image inside the existing browser mockup
  const previewImage = art
    ? art.querySelector(".service-preview-image")
    : null;

  let currentIndex = 0;
  let transitionTimer;

  function selectService(index) {
    const service = options[index];

    if (!service || !art) return;

    currentIndex = index;

    // Update active service button
    buttons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    // Start preview transition
    window.clearTimeout(transitionTimer);

    art.classList.add("is-changing");

    transitionTimer = window.setTimeout(() => {
      // Update service information
      if (number) {
        number.textContent = service.number;
      }

      if (category) {
        category.textContent = service.category;
      }

      if (caption) {
        caption.textContent = service.caption;
      }

      if (title) {
        title.textContent = service.title;
      }

      if (description) {
        description.textContent = service.description;
      }

      // Update the preview image
      if (previewImage) {
        previewImage.src = service.image;
        previewImage.alt = service.imageAlt;
      }

      // Update benefits
      if (benefits) {
        benefits.replaceChildren();

        service.benefits.forEach((benefit) => {
          const item = document.createElement("li");

          item.textContent = benefit;

          benefits.appendChild(item);
        });
      }

      // Finish transition
      art.classList.remove("is-changing");

    }, 150);
  }

  // Attach click events to service buttons
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      selectService(index);
    });
  });

  // Display the first service on initial page load
  selectService(currentIndex);

})();

