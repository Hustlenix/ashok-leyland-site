document.addEventListener('DOMContentLoaded', function () {

  var navbar = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');
  var backToTop = document.getElementById('backToTop');
  var scrollIndicator = document.querySelector('.hero-scroll-indicator');
  var form = document.getElementById('contactForm');
  var sections = document.querySelectorAll('section[id]');
  var navLinksAll = document.querySelectorAll('.nav-link');

  // ============ 1. SMOOTH SCROLLING ============
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = navbar.offsetHeight;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
        closeMobileMenu();
      }
    });
  });

  // ============ 2. STICKY NAVBAR ============
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('navbar-scrolled', window.pageYOffset > 50);
    }, { passive: true });
  }

  // ============ 3. MOBILE MENU ============
  function openMobileMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (navOverlay) navOverlay.classList.add('open');
  }

  function closeMobileMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (navOverlay) navOverlay.classList.remove('open');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') &&
          !navbar.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMobileMenu();
        hamburger.focus();
      }
    });

    if (window.ResizeObserver) {
      var resizeObserver = new ResizeObserver(function () {
        if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
          closeMobileMenu();
        }
      });
      resizeObserver.observe(document.body);
    }
  }

  // ============ 4. FORM VALIDATION ============
  if (form) {
    var fields = {
      name: {
        element: document.getElementById('name'),
        error: document.getElementById('name-error'),
        validate: function (val) {
          return val.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 characters).';
        }
      },
      email: {
        element: document.getElementById('email'),
        error: document.getElementById('email-error'),
        validate: function (val) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Please enter a valid email address.';
        }
      },
      phone: {
        element: document.getElementById('phone'),
        error: document.getElementById('phone-error'),
        validate: function (val) {
          if (!val.trim()) return '';
          return /^[\d\s\-+()]{7,20}$/.test(val.trim()) ? '' : 'Please enter a valid phone number.';
        }
      },
      message: {
        element: document.getElementById('message'),
        error: document.getElementById('message-error'),
        validate: function (val) {
          return val.trim().length >= 10 ? '' : 'Please enter a message (at least 10 characters).';
        }
      }
    };

    function validateField(field) {
      var val = field.element.value;
      var errorMsg = field.validate(val);
      field.error.textContent = errorMsg;
      field.element.classList.toggle('error', !!errorMsg);
      return !errorMsg;
    }

    Object.values(fields).forEach(function (field) {
      field.element.addEventListener('blur', function () {
        validateField(field);
      });
      field.element.addEventListener('input', function () {
        if (field.element.classList.contains('error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;
      Object.values(fields).forEach(function (field) {
        if (!validateField(field)) isValid = false;
      });
      if (!isValid) return;

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      var originalBg = btn.style.background;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Sending...';

      setTimeout(function () {
        btn.innerHTML = 'Message Sent!';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        setTimeout(function () {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.style.background = originalBg;
          btn.style.borderColor = '';
          form.reset();
          Object.values(fields).forEach(function (f) {
            f.element.classList.remove('error');
            f.error.textContent = '';
          });
        }, 3000);
      }, 800);
    });
  }

  // ============ 5. SCROLL ANIMATIONS ============
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in-init').forEach(function (el) {
      sectionObserver.observe(el);
    });

    document.querySelectorAll('.section, .cta-section').forEach(function (el) {
      el.classList.add('fade-in-init');
      sectionObserver.observe(el);
    });

    var underLineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          underLineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.title-underline').forEach(function (el) {
      underLineObserver.observe(el);
    });

    var staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.stagger-children').forEach(function (el) {
      staggerObserver.observe(el);
    });

    var timelineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.timeline-item').forEach(function (el) {
      timelineObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in-init, .stagger-children, .timeline-item').forEach(function (el) {
      el.classList.add('visible');
    });
    document.querySelectorAll('.title-underline').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ============ 6. ACTIVE NAV STATE ============
  if (sections.length > 0 && navLinksAll.length > 0) {
    window.addEventListener('scroll', function () {
      var scrollPos = window.pageYOffset + 200;
      var currentId = '';
      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = section.getAttribute('id');
        }
      });
      navLinksAll.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
      });
    }, { passive: true });
  }

  // ============ 7. COUNT-UP ANIMATIONS ============
  function animateNumber(el, target) {
    var duration = 1200;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = target > 1000 ? current.toLocaleString() : current;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  var countTargets = document.querySelectorAll('.count-target');
  var counted = new Set();

  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var parent = target.closest('[data-count]');
          if (parent && !counted.has(parent.dataset.count)) {
            counted.add(parent.dataset.count);
            animateNumber(target, parseInt(parent.dataset.count));
          }
          countObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    countTargets.forEach(function (el) {
      countObserver.observe(el);
    });
  } else {
    countTargets.forEach(function (el) {
      var parent = el.closest('[data-count]');
      if (parent) el.textContent = parent.dataset.count;
    });
  }

  // ============ 8. BACK TO TOP ============
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.pageYOffset > 400);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============ 9. HERO SCROLL INDICATOR ============
  if (scrollIndicator) {
    window.addEventListener('scroll', function () {
      scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    }, { passive: true });
  }

});
