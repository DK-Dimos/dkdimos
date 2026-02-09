// =========================================
// Mobile navigation toggle
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("site-header");
    const menuToggle = header?.querySelector(".header__menu-toggle");
    const mobileNav = document.querySelector(".nav-mobile");
  
    const closeMobileNav = () => {
      if (!menuToggle || !mobileNav) return;
      menuToggle.classList.remove("header__menu-toggle--open");
      menuToggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("nav-mobile--open");
    };
  
    const openMobileNav = () => {
      if (!menuToggle || !mobileNav) return;
      menuToggle.classList.add("header__menu-toggle--open");
      menuToggle.setAttribute("aria-expanded", "true");
      mobileNav.classList.add("nav-mobile--open");
    };
  
    if (menuToggle && mobileNav) {
      menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.contains("header__menu-toggle--open");
        if (isOpen) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
  
      // Close the mobile menu when any link is clicked
      mobileNav.addEventListener("click", (event) => {
        const target = event.target;
        if (
          target instanceof HTMLElement &&
          target.matches("a.nav-mobile__link")
        ) {
          closeMobileNav();
        }
      });
    }
  
    // =========================================
    // Sticky header scroll state (shadow / density)
    // =========================================
    const SCROLL_THRESHOLD = 8;
  
    const updateHeaderOnScroll = () => {
      if (!header) return;
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    };
  
    updateHeaderOnScroll();
    window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
  
    // =========================================
    // Smooth scroll for in-page anchor links
    // =========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const rect = target.getBoundingClientRect();
        const offsetTop =
          rect.top + window.scrollY - (header?.offsetHeight ?? 0) - 12;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      });
    });

    // =========================================
    // CTA do hero: rolar até a seção de layouts
    // =========================================
    const layoutsSection = document.getElementById("layouts");
    const heroLayoutsCta = document.getElementById("hero-layouts-cta");

    if (heroLayoutsCta && layoutsSection) {
      heroLayoutsCta.addEventListener("click", () => {
        const rect = layoutsSection.getBoundingClientRect();
        const offsetTop =
          rect.top + window.scrollY - (header?.offsetHeight ?? 0) - 16;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      });
    }
  });