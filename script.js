/* ===== SCRIPT.JS - Arlene Jane's Lucan Journey ===== */

// ─── Sticky Header ───────────────────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ─── Hamburger / Mobile Nav ──────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans.forEach(s => s.classList.toggle('active'));
});

// Close mobile nav when a link is clicked
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
  });
});

// ─── Active Nav Link on Scroll ───────────────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ─── Scroll-Reveal (IntersectionObserver) ────────────────────────────────────
const revealEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards slightly
      const delay = entry.target.closest('.skills-grid, .portfolio-grid')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));


// ─── Contact Form ─────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('input-name').value.trim();
  const email   = document.getElementById('input-email').value.trim();
  const message = document.getElementById('input-message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate form submission
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1200);
});

// ─── Smooth Scroll for all anchor links ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Photo Modal ─────────────────────────────────────────────────────────────
const modal = document.getElementById("photo-modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.getElementById("close-modal");
const portfolioImages = document.querySelectorAll(".portfolio-img img");

portfolioImages.forEach(img => {
  img.addEventListener("click", function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

closeModal.addEventListener("click", function() {
  modal.style.display = "none";
});

// Close when clicking outside the image
modal.addEventListener("click", function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
