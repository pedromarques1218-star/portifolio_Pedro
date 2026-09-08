/* ============================================
   PEDRO H. MARQUES — PORTFOLIO
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initMobileMenu();
  initSmoothScroll();
  initNavbarColorSwitch();
});

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Navbar color switch on dark sections --- */
function initNavbarColorSwitch() {
  const navbar = document.querySelector('.navbar');
  if (!navbar || !document.querySelector('.home-project')) return;

  const darkSections = document.querySelectorAll('.home-project');
  const heroSection = document.querySelector('.hero');

  const observer = new IntersectionObserver((entries) => {
    let inDark = false;
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        inDark = true;
      }
    });

    const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
    const heroVisible = heroRect && heroRect.bottom > 80;

    if (!heroVisible && !navbar.classList.contains('scrolled')) {
      navbar.classList.add('navbar--light');
    } else {
      navbar.classList.remove('navbar--light');
    }
  }, { threshold: [0, 0.1, 0.5] });

  darkSections.forEach(s => observer.observe(s));

  window.addEventListener('scroll', () => {
    const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
    const heroBottom = heroRect ? heroRect.bottom : 0;

    if (heroBottom < 80) {
      if (!navbar.classList.contains('scrolled')) {
        navbar.classList.add('navbar--light');
      }
    } else {
      navbar.classList.remove('navbar--light');
    }
  }, { passive: true });
}

/* --- Scroll animations (fade-in) --- */
function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* --- Mobile menu --- */
function initMobileMenu() {
  const btn = document.querySelector('.nav-hamburger');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --- Smooth scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
