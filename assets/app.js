(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'mc-lang';

  /* ── language ──────────────────────────────────────────────── */

  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  if (saved !== 'tr' && saved !== 'en') {
    var nav = (navigator.language || 'tr').toLowerCase();
    saved = nav.indexOf('tr') === 0 ? 'tr' : 'en';
  }
  setLang(saved);

  document.getElementById('langToggle').addEventListener('click', function () {
    setLang(root.dataset.lang === 'tr' ? 'en' : 'tr');
  });

  /* ── nav background on scroll ──────────────────────────────── */

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      document.body.classList.toggle('scrolled', window.scrollY > 24);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── reveal on scroll, staggered per group ─────────────────── */

  var items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    root.classList.add('no-js');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    var lastParent = null, i = 0;
    items.forEach(function (el) {
      if (el.parentNode !== lastParent) { lastParent = el.parentNode; i = 0; }
      el.style.setProperty('--d', Math.min(i++, 6) * 70 + 'ms');
      io.observe(el);
    });
  }

  /* ── pointer-tracked glow on app cards ─────────────────────── */

  if (matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.app').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ── footer year ───────────────────────────────────────────── */

  document.getElementById('year').textContent = new Date().getFullYear();
})();
