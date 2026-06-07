(function () {
  'use strict';

  /* ============ PARTICLE CONSTELLATION ============ */
  var canvas = document.getElementById('constellation-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouseX = -9999;
    var mouseY = -9999;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    var colors = [
      '128, 82, 255',
      '255, 184, 41',
      '21, 132, 110',
      '255, 255, 255'
    ];

    var shapes = ['circle', 'triangle', 'diamond', 'square'];

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    }

    function createParticles() {
      particles = [];
      var count = Math.min(1200, Math.floor((canvas.width * canvas.height) / 600));
      var w = canvas.width;
      var h = canvas.height;

      for (var i = 0; i < count; i++) {
        var clusterX = Math.random();
        var clusterY = Math.random();
        var spread = 0.3;

        var cx, cy;

        // Create organic clusters
        if (i < count * 0.4) {
          cx = 0.6 + (Math.random() - 0.5) * spread;
          cy = 0.4 + (Math.random() - 0.5) * spread;
        } else if (i < count * 0.7) {
          cx = 0.3 + (Math.random() - 0.5) * spread;
          cy = 0.7 + (Math.random() - 0.5) * spread;
        } else {
          cx = Math.random();
          cy = Math.random();
        }

        particles.push({
          x: cx * w,
          y: cy * h,
          baseX: cx * w,
          baseY: cy * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 2 + Math.random() * 4,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.15 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    function drawShape(x, y, size, shape) {
      var s = size * DPR;
      switch (shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(x, y, s / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(x, y - s / 2);
          ctx.lineTo(x + s / 2, y + s / 2);
          ctx.lineTo(x - s / 2, y + s / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(x, y - s / 2);
          ctx.lineTo(x + s / 2, y);
          ctx.lineTo(x, y + s / 2);
          ctx.lineTo(x - s / 2, y);
          ctx.closePath();
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
          break;
      }
    }

    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var w = canvas.width;
      var h = canvas.height;
      var t = time * 0.001;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var dx = mouseX - p.x;
        var dy = mouseY - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse repulsion
        if (dist < 200 * DPR) {
          var force = (200 * DPR - dist) / (200 * DPR) * 0.5;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        // Return to base
        p.vx += (p.baseX - p.x) * 0.001;
        p.vy += (p.baseY - p.y) * 0.001;

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Sine wave drift
        p.vx += Math.sin(t + p.phase) * 0.02;
        p.vy += Math.cos(t * 0.7 + p.phase * 1.3) * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges gently
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        // Draw connections for nearby particles (optimized: only check first ~200)
        if (i < 200) {
          for (var j = i + 1; j < Math.min(particles.length, 200); j++) {
            var p2 = particles[j];
            var cdx = p.x - p2.x;
            var cdy = p.y - p2.y;
            var cdist = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cdist < 80 * DPR) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = 'rgba(128, 82, 255, ' + (0.04 * (1 - cdist / (80 * DPR))) + ')';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        // Draw particle
        ctx.fillStyle = 'rgba(' + p.color + ', ' + p.opacity + ')';
        drawShape(p.x, p.y, p.size, p.shape);
      }

      requestAnimationFrame(animate);
    }

    function onMouseMove(e) {
      var rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * DPR;
      mouseY = (e.clientY - rect.top) * DPR;
    }

    function onMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    resize();
    createParticles();
    animate(0);

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        createParticles();
      }, 200);
    });
  }

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

  // Escape key closes menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      navOverlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });

  // Sticky navbar
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

  /* ============ TITLE UNDERLINE ============ */
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
