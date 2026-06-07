(function () {
  'use strict';

  /* ============ NAVBAR ============ */
  var navbar = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');

  if (hamburger && navLinks && navOverlay) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      navOverlay.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      document.body.classList.toggle('menu-open', open);
    });

    navOverlay.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      navOverlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        navOverlay.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      navOverlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });

  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ============ ACTIVE NAV LINK ============ */
  var navLinkEls = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    var scrollY = window.scrollY + 120;
    var current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });
    navLinkEls.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('load', updateActiveLink);

  /* ============ SMOOTH SCROLL ============ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight + 10 : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============ SCROLL ANIMATIONS ============ */
  var fadeEls = document.querySelectorAll('.fade-init');
  var staggerEls = document.querySelectorAll('.stagger-children');
  var timelineItems = document.querySelectorAll('.timeline-item');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(function (el) { observer.observe(el); });
  staggerEls.forEach(function (el) { observer.observe(el); });
  timelineItems.forEach(function (el) { observer.observe(el); });

  var titleLines = document.querySelectorAll('.title-underline');
  titleLines.forEach(function (el) { observer.observe(el); });

  /* ============ COUNT-UP ============ */
  var countTargets = document.querySelectorAll('.count-target');

  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.parentElement.parentElement.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        var duration = 2000;
        var start = performance.now();

        function update(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.round(eased * target);
          el.textContent = current.toLocaleString();
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target.toLocaleString();
          }
        }

        requestAnimationFrame(update);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countTargets.forEach(function (el) { countObserver.observe(el); });

  /* ============ FORM VALIDATION ============ */
  var form = document.getElementById('contactForm');
  if (form) {
    var fields = {
      name: {
        validate: function (v) { return v.trim().length >= 2; },
        message: 'Please enter your full name (min 2 characters)'
      },
      email: {
        validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
        message: 'Please enter a valid email address'
      },
      phone: {
        validate: function (v) { return !v || v.trim().length >= 7; },
        message: 'Please enter a valid phone number'
      },
      message: {
        validate: function (v) { return v.trim().length >= 10; },
        message: 'Please enter at least 10 characters'
      }
    };

    Object.keys(fields).forEach(function (id) {
      var input = document.getElementById(id);
      var errorEl = document.getElementById(id + '-error');
      if (input && errorEl) {
        input.addEventListener('blur', function () {
          var valid = fields[id].validate(input.value);
          input.classList.toggle('error', !valid && input.value !== '');
          errorEl.textContent = !valid && input.value !== '' ? fields[id].message : '';
        });
        input.addEventListener('input', function () {
          var valid = fields[id].validate(input.value);
          input.classList.toggle('error', !valid && input.value !== '');
          errorEl.textContent = !valid && input.value !== '' ? fields[id].message : '';
        });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      Object.keys(fields).forEach(function (id) {
        var input = document.getElementById(id);
        var errorEl = document.getElementById(id + '-error');
        if (input && errorEl) {
          var fieldValid = fields[id].validate(input.value);
          input.classList.toggle('error', !fieldValid);
          errorEl.textContent = fieldValid ? '' : fields[id].message;
          if (!fieldValid) valid = false;
        }
      });

      if (valid) {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = '<span class="spinner"></span> Sending...';
        }
        setTimeout(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'Message Sent!';
            btn.style.background = '#15846e';
            btn.style.borderColor = '#15846e';
            setTimeout(function () {
              btn.textContent = 'Send Message';
              btn.style.background = '';
              btn.style.borderColor = '';
              form.reset();
            }, 3000);
          }
        }, 1500);
      }
    });
  }

  /* ============ BACK TO TOP ============ */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
