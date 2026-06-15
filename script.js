/* ============================================
   AMARNATH D.J. PORTFOLIO — SCRIPT
   ============================================ */

// ─────────────────────────────────────────────
// 1. NAVBAR — scroll + active link + hamburger
// ─────────────────────────────────────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger-btn');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightActiveNav();
}, { passive: true });

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    const top = s.getBoundingClientRect().top;
    if (top <= 120) current = s.id;
  });
  allNavLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
}

// ─────────────────────────────────────────────
// 2. TYPED ROLES — hero typewriter effect
// ─────────────────────────────────────────────
const roles = [
  'Emerging AI Engineer',
  'ML Pipeline Builder',
  'Computer Vision Developer',
  'Data Science Enthusiast',
  'Full-Stack ML Developer',
];
let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;
const typedEl = document.getElementById('typed-role');

function typeRole() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 45 : 80);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeRole, 800);
  initScrollAnimations();
  initCounters();
});

// ─────────────────────────────────────────────
// 3. INTERSECTION OBSERVER — fade-in + timeline
// ─────────────────────────────────────────────
function initScrollAnimations() {
  // Generic fade-in-up
  const fadeEls = [
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.skill-category'),
    ...document.querySelectorAll('.achievement-card'),
    ...document.querySelectorAll('.contact-item'),
  ];
  fadeEls.forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));

  // Timeline items
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        tlObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
    tlObserver.observe(el);
  });

  // Section headers
  const hdrObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'fadeInUp 0.7s ease forwards';
        hdrObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section-header').forEach(el => {
    el.style.opacity = '0';
    hdrObserver.observe(el);
  });
}

// ─────────────────────────────────────────────
// 4. STAT COUNTERS — count-up animation
// ─────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el      = e.target;
      const target  = parseInt(el.textContent.replace('+',''));
      const suffix  = el.textContent.includes('+') ? '+' : '';
      let   current = 0;
      const step    = Math.max(1, Math.floor(target / 40));
      const timer   = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ─────────────────────────────────────────────
// 5. HERO PARALLAX — subtle movement on mouse
// ─────────────────────────────────────────────
const heroSection = document.getElementById('hero');
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
const orb3 = document.querySelector('.orb-3');

document.addEventListener('mousemove', (e) => {
  if (!heroSection || !orb1) return;
  const { innerWidth: W, innerHeight: H } = window;
  const dx = (e.clientX / W - 0.5) * 2;   // -1 to 1
  const dy = (e.clientY / H - 0.5) * 2;

  orb1.style.transform = `translate(${dx * 25}px, ${dy * 20}px)`;
  orb2.style.transform = `translate(${dx * -20}px, ${dy * -15}px)`;
  orb3.style.transform = `translate(${dx * 15}px, ${dy * 25}px)`;
}, { passive: true });

// ─────────────────────────────────────────────
// 6. SKILL TAG HOVER ripple
// ─────────────────────────────────────────────
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'scale(1.06)';
    tag.style.transition = '0.2s ease';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'scale(1)';
  });
});

// ─────────────────────────────────────────────
// 7. PROJECT CARD — tilt effect
// ─────────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const rx   = (e.clientY - cy) / (rect.height / 2) * 4;
    const ry   = (e.clientX - cx) / (rect.width  / 2) * -4;
    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease';
  });
});

// ─────────────────────────────────────────────
// 8. SMOOTH SCROLL for anchor links
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─────────────────────────────────────────────
// 9. CONTACT items — stagger on visible
// ─────────────────────────────────────────────
const ctaBox = document.getElementById('contact-cta-box');
if (ctaBox) {
  const ctaObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'fadeInUp 0.7s ease forwards';
        e.target.style.opacity   = '0';
        setTimeout(() => e.target.style.opacity = '', 10);
        ctaObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  ctaObs.observe(ctaBox);
}
