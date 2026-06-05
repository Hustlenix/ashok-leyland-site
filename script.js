document.addEventListener('DOMContentLoaded', function () {

  // ============ 1. SMOOTH SCROLLING ============
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var nav = document.getElementById('navbar');
        var navHeight = nav.offsetHeight;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
        var navLinks = document.getElementById('navLinks');
        var hamburger = document.getElementById('hamburger');
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ============ 2. STICKY NAVBAR ============
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // ============ 3. MOBILE MENU ============
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============ 4. FORM VALIDATION ============
  var form = document.getElementById('contactForm');
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
          var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRe.test(val.trim()) ? '' : 'Please enter a valid email address.';
        }
      },
      phone: {
        element: document.getElementById('phone'),
        error: document.getElementById('phone-error'),
        validate: function (val) {
          if (!val.trim()) return '';
          var phoneRe = /^[\d\s\-\+\(\)]{7,20}$/;
          return phoneRe.test(val.trim()) ? '' : 'Please enter a valid phone number.';
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
      if (errorMsg) {
        field.element.classList.add('error');
      } else {
        field.element.classList.remove('error');
      }
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
        if (!validateField(field)) {
          isValid = false;
        }
      });
      if (isValid) {
        var btn = form.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          form.reset();
          Object.values(fields).forEach(function (f) {
            f.element.classList.remove('error');
            f.error.textContent = '';
          });
        }, 3000);
      }
    });
  }

  // ============ 5. SCROLL ANIMATIONS + TITLE UNDERLINES ============
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in', 'visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section, .cta-section').forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });

    // Title underlines
    var underlineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          underlineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.title-underline').forEach(function (el) {
      underlineObserver.observe(el);
    });

    // Stagger children (cards, benefits, projects)
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

    // Timeline items
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
    document.querySelectorAll('.fade-in, .stagger-children, .timeline-item').forEach(function (el) {
      el.classList.add('visible');
    });
    document.querySelectorAll('.title-underline').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ============ 6. ACTIVE NAV STATE ============
  var sections = document.querySelectorAll('section[id]');
  var navLinksAll = document.querySelectorAll('.nav-link');

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
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentId) {
          link.classList.add('active');
        }
      });
    });
  }

  // ============ 7. COUNT-UP ANIMATIONS ============
  var countTargets = document.querySelectorAll('.count-target');
  var counted = {};

  function animateNumber(el, target, suffix) {
    var duration = 1500;
    var steps = 60;
    var stepTime = duration / steps;
    var current = 0;
    var increment = target / steps;
    var formatter = target > 1000 ? function (v) { return Math.round(v).toLocaleString(); } : Math.round;

    function tick() {
      current += increment;
      if (current >= target) {
        el.textContent = formatter(target);
        return;
      }
      el.textContent = formatter(current);
      requestAnimationFrame(function () {
        setTimeout(tick, stepTime);
      });
    }
    tick();
  }

  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var parent = target.closest('[data-count]');
          if (parent && !counted[parent.dataset.count]) {
            counted[parent.dataset.count] = true;
            var val = parseInt(parent.dataset.count);
            animateNumber(target, val, parent.dataset.suffix || '');
          } else if (!parent && !counted['default']) {
            counted['default'] = true;
            var fallback = parseInt(target.textContent.replace(/[^0-9]/g, '')) || 0;
            animateNumber(target, fallback);
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
      if (parent) {
        el.textContent = parent.dataset.count;
      }
    });
  }

  // ============ 8. BACK TO TOP ============
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============ 9. HERO SCROLL INDICATOR HIDE ON SCROLL ============
  var scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transition = 'opacity 0.5s ease';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });
  }

});
