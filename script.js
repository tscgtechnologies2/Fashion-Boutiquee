/**
 * FASHION BOUTIQUE - LUXURY EDITORIAL JAVASCRIPT CONTROLLER
 * Vanilla JavaScript only (No frameworks or external dependencies)
 * Features: Sticky Navigation, Mobile Drawer Menu, Collection Filtering,
 * FAQ Accordion, Scroll Reveal Animations, Form Validation, and Image Resilience.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initCollectionFilter();
  initFaqAccordion();
  initScrollReveal();
  initContactForm();
  initImageResilience();
});

/**
 * 1. Sticky Header & Active Navigation State
 */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run immediately on load

  // Smooth scroll and active nav link tracking
  const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/**
 * 2. Mobile Drawer Navigation
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    drawer.classList.add('open');
    backdrop.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 3. Collection Category Filtering
 */
function initCollectionFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.collection-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        
        // Add fade-out transition
        card.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';

        setTimeout(() => {
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 350);
      });
    });
  });
}

/**
 * 4. FAQ Accordion Toggle
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!questionBtn || !answerDiv) return;

    questionBtn.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Optional: Close other open accordions for clean luxury behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      if (isCurrentlyActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
        answerDiv.style.maxHeight = null;
        if (icon) icon.textContent = '+';
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
        if (icon) icon.textContent = '—';
      }
    });
  });
}

/**
 * 5. Scroll Reveal Animations (IntersectionObserver)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length || !('IntersectionObserver' in window)) {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/**
 * 6. Contact Form Validation and Submission Handler
 */
function initContactForm() {
  const form = document.getElementById('bookingForm');
  const feedback = document.getElementById('formSuccessFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Custom live validation check
    const requiredInputs = form.querySelectorAll('[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
      if (!input.value || !input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#D32F2F';
        input.style.backgroundColor = 'rgba(211, 47, 47, 0.08)';
      } else {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
      }
    });

    // Email validation regex check
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        isValid = false;
        emailInput.style.borderColor = '#D32F2F';
        emailInput.style.backgroundColor = 'rgba(211, 47, 47, 0.08)';
      }
    }

    if (!isValid) {
      // Shake animation effect for luxury error feedback
      form.style.animation = 'shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both';
      setTimeout(() => { form.style.animation = ''; }, 400);
      return;
    }

    // Success State
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Processing Reservation...';
      submitBtn.disabled = true;

      setTimeout(() => {
        feedback.classList.add('success');
        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Auto hide success banner after 8 seconds
        setTimeout(() => {
          feedback.classList.remove('success');
        }, 8000);
      }, 750);
    }
  });

  // Clear validation styling when user types
  const allInputs = form.querySelectorAll('.form-control');
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      input.style.backgroundColor = '';
    });
  });
}

/**
 * 7. Image Fallback & Shimmer Resilience
 * Guarantees zero broken images by displaying a tailored luxury SVG pattern if network lags or fails.
 */
function initImageResilience() {
  const images = document.querySelectorAll('img');

  const fallbackSvgUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="100%" height="100%" fill="%23EFECE6"/><text x="50%" y="50%" font-family="serif" font-size="28" fill="%23C5A880" text-anchor="middle" letter-spacing="4">FASHION BOUTIQUE</text><text x="50%" y="54%" font-family="sans-serif" font-size="14" fill="%23595754" text-anchor="middle" letter-spacing="2">EDITORIAL CURATION</text></svg>`;

  images.forEach(img => {
    // Add shimmer class while loading
    if (!img.complete) {
      img.classList.add('img-shimmer');
      img.addEventListener('load', () => {
        img.classList.remove('img-shimmer');
      });
    }

    img.addEventListener('error', () => {
      img.classList.remove('img-shimmer');
      // Set to luxury SVG placeholder
      if (img.src !== fallbackSvgUrl) {
        img.src = fallbackSvgUrl;
      }
    });
  });
}

/* Shake keyframe definition injected dynamically for error state */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }
`;
document.head.appendChild(styleSheet);
