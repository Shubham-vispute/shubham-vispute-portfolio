(() => {
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
    cards.forEach(card => card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter));
  }));

  const printButton = document.getElementById("printResume");
  if (printButton) printButton.addEventListener("click", () => {
    window.location.href = "resume.html";
    setTimeout(() => window.print(), 500);
  });
})();