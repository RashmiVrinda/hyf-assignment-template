document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Theme toggle (saved)
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  const mainContent = document.getElementById("mainContent");
  const navLinks = Array.from(document.querySelectorAll(".nav-btn"));
  const sectionIds = navLinks
    .map((a) => a.getAttribute("href"))
    .filter((h) => h && h.startsWith("#"));

  const sections = sectionIds
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  // Smooth scroll INSIDE main-content
  function scrollToSection(target) {
    if (!mainContent || !target) return;

    const top = target.offsetTop; // offset within scroll container
    mainContent.scrollTo({ top: top - 12, behavior: "smooth" });
  }

  function setActiveById(id) {
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
  }

  navLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || !id.startsWith("#")) return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      scrollToSection(target);
      setActiveById(id);
    });
  });

  // Update active nav on scroll (IntersectionObserver in scroll container)
  if (mainContent && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveById(`#${visible.target.id}`);
        }
      },
      {
        root: mainContent,
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }
});