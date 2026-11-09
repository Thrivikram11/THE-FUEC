document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // On phones, the first tap opens a dropdown; a second tap follows its page link.
  document.querySelectorAll(".nav-item.dropdown > a").forEach(link => {
    link.addEventListener("click", event => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        const parent = link.closest(".dropdown");
        if (parent && !parent.classList.contains("open")) {
          event.preventDefault();
          parent.classList.add("open");
          return;
        }
      }
      if (navLinks && menuToggle) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close the mobile navigation after choosing a submenu item.
  navLinks?.querySelectorAll(".dropdown-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const banner = document.getElementById("cookieBanner");
  const modal = document.getElementById("cookieModal");
  const hideBanner = () => banner?.classList.add("hidden");
  const closeModal = () => {
    if (modal) { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
  };
  if (localStorage.getItem("the-fuec-cookie-choice")) hideBanner();
  document.getElementById("acceptCookies")?.addEventListener("click", () => {
    localStorage.setItem("the-fuec-cookie-choice", "accepted"); hideBanner();
  });
  document.getElementById("cookieClose")?.addEventListener("click", hideBanner);
  document.getElementById("manageCookies")?.addEventListener("click", () => {
    if (modal) { modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); }
  });
  document.getElementById("closeCookieModal")?.addEventListener("click", closeModal);
  document.getElementById("saveCookiePreferences")?.addEventListener("click", () => {
    const analytics = document.getElementById("analyticsCookies");
    localStorage.setItem("the-fuec-cookie-choice", analytics?.checked ? "analytics" : "essential-only");
    closeModal(); hideBanner();
  });
  modal?.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  document.querySelector(".search-button")?.addEventListener("click", () => alert("Website search will be added in a future update."));
});
