/**
 * SatuBumi Landing Page — main.js
 * Total budget: < 10KB minified
 * Handles: hero animations, sticky nav, count-up, accordion, forms, sticky nav hide/show
 */

(function () {
  'use strict';

  /* ============================================
     1. HERO STAGGERED ENTRANCE ANIMATION
     ============================================ */
  function initHeroAnimation() {
    const items = document.querySelectorAll('.hero-anim');
    items.forEach(function (el) {
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(function () {
        el.style.animation = 'slideUp 400ms cubic-bezier(0.16,1,0.3,1) forwards';
      }, delay);
    });

    const heroImg = document.querySelector('.hero-img-anim');
    if (heroImg) {
      setTimeout(function () {
        heroImg.style.animation = 'fadeIn 400ms cubic-bezier(0.16,1,0.3,1) forwards';
        heroImg.style.opacity = '1';
      }, 400);
    }
  }

  /* ============================================
     2. STICKY BOTTOM NAV — show/hide logic
     ============================================ */
  function initStickyNav() {
    var nav = document.getElementById('sticky-nav');
    if (!nav) return;

    var heroHeight = window.innerHeight;
    var b2bForm = document.getElementById('korporasi');
    var b2cForm = document.getElementById('kampus');
    var shown = false;

    function getBottom(el) {
      if (!el) return Infinity;
      return el.getBoundingClientRect().bottom + window.scrollY;
    }

    function update() {
      var scrollY = window.scrollY;
      var vpH = window.innerHeight;

      // Show after scrolling past hero (> 100vh)
      if (scrollY > heroHeight * 0.9) {
        if (!shown) {
          nav.classList.add('visible');
          shown = true;
        }
      } else {
        nav.classList.remove('visible');
        shown = false;
        return;
      }

      // Hide when either form section is in viewport
      var b2bRect = b2bForm ? b2bForm.getBoundingClientRect() : null;
      var b2cRect = b2cForm ? b2cForm.getBoundingClientRect() : null;

      var formVisible = (b2bRect && b2bRect.top < vpH && b2bRect.bottom > 0) ||
                        (b2cRect && b2cRect.top < vpH && b2cRect.bottom > 0);

      if (formVisible) {
        nav.classList.remove('visible');
      } else if (scrollY > heroHeight * 0.9) {
        nav.classList.add('visible');
      }
    }

    window.addEventListener('scroll', update, { passive: true });
  }

  /* ============================================
     3. COUNT-UP ANIMATION (Intersection Observer)
     ============================================ */
  function initCountUp() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var hasRun = false;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounter(el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      var prefix = el.dataset.prefix || '';
      var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
      var duration = 1500;
      var start = performance.now();

      function step(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = easeOutExpo(progress);
        var current = target * eased;
        el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + suffix;
        }
      }

      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          counters.forEach(animateCounter);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    var section = document.getElementById('impact-numbers');
    if (section) observer.observe(section);
  }

  /* ============================================
     4. ACCORDION
     ============================================ */
  function initAccordion() {
    var items = document.querySelectorAll('.accordion-item');

    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion-trigger');
      var content = item.querySelector('.accordion-content');
      var inner = item.querySelector('.accordion-content-inner');
      if (!trigger || !content || !inner) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all
        items.forEach(function (other) {
          var otherContent = other.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = '0';
          other.classList.remove('open');
        });

        // Open this one
        if (!isOpen) {
          item.classList.add('open');
          content.style.maxHeight = inner.scrollHeight + 'px';
        }
      });

      // Keyboard support
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('role', 'button');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });

      // Update aria
      var observer2 = new MutationObserver(function () {
        trigger.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
      });
      observer2.observe(item, { attributes: true, attributeFilter: ['class'] });
    });
  }

  /* ============================================
     5. FORM VALIDATION & SUBMISSION
     ============================================ */
  function validateField(input) {
    var val = input.value.trim();
    var name = input.name;
    var errorEl = document.getElementById(input.id + '-error');
    var msg = '';

    if (input.required && !val) {
      if (name === 'phone' || name === 'phone_b2c') {
        msg = 'Nomor WhatsApp dibutuhkan agar kami bisa menghubungi Anda.';
      } else if (name === 'name' || name === 'name_b2c') {
        msg = 'Nama dan perusahaan/kampus wajib diisi.';
      } else if (name === 'position') {
        msg = 'Jabatan Anda membantu kami menyiapkan materi yang tepat.';
      } else {
        msg = 'Field ini wajib diisi.';
      }
    }

    if (!msg && (name === 'phone' || name === 'phone_b2c') && val) {
      // Basic Indonesian phone validation
      if (!/^(\+62|62|08)[0-9]{7,12}$/.test(val.replace(/\s/g, ''))) {
        msg = 'Nomor WhatsApp tidak valid — pastikan diawali 08 atau +62.';
      }
    }

    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.toggle('visible', !!msg);
    }
    input.classList.toggle('error', !!msg);
    return !msg;
  }

  function initForm(formId, successId, isB2c) {
    var form = document.getElementById(formId);
    var successEl = document.getElementById(successId);
    if (!form || !successEl) return;

    // Real-time validation on blur
    form.querySelectorAll('input, select').forEach(function (input) {
      input.addEventListener('blur', function () {
        validateField(input);
      });
      input.addEventListener('input', function () {
        if (input.classList.contains('error')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var inputs = form.querySelectorAll('input[required], select[required]');
      var valid = true;
      inputs.forEach(function (input) {
        if (!validateField(input)) valid = false;
      });
      if (!valid) return;

      var btn = form.querySelector('button[type="submit"]');
      var originalHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span><span style="margin-left:8px">Mengirim...</span>';

      // Collect form data
      var data = new FormData(form);
      var name = data.get('name') || data.get('name_b2c') || '';
      var phone = data.get('phone') || data.get('phone_b2c') || '';

      // Submit to Formspree (replace FORM_ID with actual)
      var endpoint = form.dataset.endpoint || '#';

      if (endpoint === '#') {
        // Demo mode — simulate 800ms delay
        setTimeout(function () {
          showSuccess(form, successEl, name, phone, isB2c);
        }, 800);
        return;
      }

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          showSuccess(form, successEl, name, phone, isB2c);
        } else {
          btn.disabled = false;
          btn.innerHTML = originalHTML;
          alert('Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.');
        }
      }).catch(function () {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        alert('Tidak dapat terhubung. Periksa koneksi internet Anda.');
      });
    });
  }

  function showSuccess(form, successEl, name, phone, isB2c) {
    var firstName = name.split(' ')[0] || name;
    var timeText = isB2c ? '2 jam' : '24 jam';
    var waNumber = '628xxxxxxxxx'; // replace with real number

    form.style.display = 'none';
    successEl.classList.add('visible');
    successEl.querySelector('.success-name').textContent = firstName;
    successEl.querySelector('.success-phone').textContent = phone;
    if (successEl.querySelector('.success-time')) {
      successEl.querySelector('.success-time').textContent = timeText;
    }
    successEl.querySelector('.btn-wa').href = 'https://wa.me/' + waNumber;
  }

  /* ============================================
     6. SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ============================================
     7. INTERSECTION OBSERVER — generic fade-in for sections
     ============================================ */
  function initSectionFadeIn() {
    var sections = document.querySelectorAll('.section-reveal');
    if (!sections.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ============================================
     INIT
     ============================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroAnimation();
    initStickyNav();
    initCountUp();
    initAccordion();
    initForm('form-b2b', 'success-b2b', false);
    initForm('form-b2c', 'success-b2c', true);
    initSmoothScroll();
    initSectionFadeIn();
  });

})();
