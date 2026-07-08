// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== HEADER SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeBtn  = document.getElementById('mobileNavClose');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

closeBtn.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
});

document.querySelectorAll('#mobileNav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== PARALLAX HERO =====
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrollY = window.scrollY;
  heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
}, { passive: true });

// ===== MENU TABS =====
const tabBtns   = document.querySelectorAll('.menu-tab-btn');
const tabPanels = document.querySelectorAll('.menu-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById('panel-' + target).classList.add('active');
  });
});

// ===== RIPPLE EFFECT =====
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x    = e.clientX - rect.left - size / 2;
    const y    = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ===== MATCHA RIPPLE BG =====
const matchaSection = document.querySelector('#menu');

if (matchaSection) {
  matchaSection.addEventListener('mousemove', (e) => {
    // subtle highlight follow on matcha panel only
  });
}

// ===== SMOOTH SCROLL OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const headerH = header.offsetHeight;
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerH - 8;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});

// ===== STAGGER CARDS =====
function staggerCards(parentSelector, childSelector, baseDelay = 0.1) {
  const parents = document.querySelectorAll(parentSelector);
  parents.forEach(parent => {
    const cards = parent.querySelectorAll(childSelector);
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${baseDelay * i}s`;
    });
  });
}
staggerCards('.concept-cards', '.concept-card');
staggerCards('.menu-cards',    '.menu-card');
staggerCards('.matcha-items',  '.matcha-card');

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('nav-active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== GALLERY LIGHTBOX (simple) =====
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.setAttribute('role', 'button');
  item.setAttribute('tabindex', '0');
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===== URL PARAMETER TAB SWITCHER =====
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  if (tabParam) {
    const btn = document.querySelector(`.menu-tab-btn[data-tab="${tabParam}"]`);
    const panel = document.getElementById('panel-' + tabParam);
    if (btn && panel) {
      // 一旦すべてのタブとパネルを非アクティブ化
      document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
      
      // 対象のタブとパネルをアクティブ化
      btn.classList.add('active');
      panel.classList.add('active');
      
      // 対象タブが画面に収まるように少し調整
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
});

// ===== TOP MENU SLIDERS =====
function initMenuSlider(sliderId) {
  const container = document.getElementById(sliderId);
  if (!container) return;
  
  const slides = container.querySelectorAll('.slide');
  if (slides.length <= 1) return;
  
  let currentIdx = 0;
  
  setInterval(() => {
    slides[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % slides.length;
    slides[currentIdx].classList.add('active');
  }, 5000);
}

window.addEventListener('DOMContentLoaded', () => {
  initMenuSlider('hero-slider');
  initMenuSlider('food-slider');
  initMenuSlider('drink-slider');
  initMenuSlider('sweets-slider');
  initMenuSlider('chiffon-slider');
  initMenuSlider('classic-slider');
  initMenuSlider('farm-slider');
  initMenuSlider('shop-slider');
  initMenuSlider('concept-mobile-slider');
  initMenuSlider('concept-image-slider');
  initMenuSlider('muffin-slider');
});


