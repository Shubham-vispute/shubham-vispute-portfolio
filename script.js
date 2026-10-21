(() => {
  "use strict";
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      toggle.textContent = open ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      toggle.textContent = "☰";
    }));
  }

  const filters = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    cards.forEach(card => {
      const hidden = filter !== "all" && card.dataset.category !== filter;
      card.classList.toggle("hidden", hidden);
      if (!hidden) card.classList.add("filter-enter");
      window.setTimeout(() => card.classList.remove("filter-enter"), 420);
    });
  }));

  const printButton = document.getElementById("printResume");
  if (printButton) printButton.addEventListener("click", () => {
    window.location.href = "resume.html";
  });

  // Progressive enhancement: content remains visible if JS/IntersectionObserver is unavailable.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".reveal, .reveal-item");
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealTargets.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 65}ms`);
      observer.observe(element);
    });
  } else {
    revealTargets.forEach(element => element.classList.add("is-visible"));
  }

  // Subtle pointer tilt on larger screens only; disabled for touch and reduced-motion users.
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".project-card, .skill-card, .learning-card, .video-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
      });
    });
  }
})();