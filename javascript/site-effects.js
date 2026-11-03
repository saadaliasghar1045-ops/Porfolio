/* SITE EFFECTS - theme switching, shared helpers, magnetic buttons, page-wide details */
(function () {
  'use strict';
  var P = window.PORTFOLIO;
  var root = document.documentElement;

  /* ---- Theme toggle (remembers the choice) ---- */
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
    });
  });

  /* ---- Fill profile text ---- */
  document.querySelectorAll('[data-profile="name"]').forEach(function (el) { el.textContent = P.profile.name; });
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Shared helper: tool icon element (image, or monogram fallback) ---- */
  P.toolIcon = function (tool) {
    var wrap = document.createElement('span');
    wrap.className = 'tool-icon';
    wrap.style.setProperty('--tc', tool.color || 'var(--accent)');
    function mono() {
      wrap.classList.add('is-mono');
      wrap.textContent = tool.mono || tool.name.slice(0, 2);
    }
    if (tool.icon) {
      var img = new Image();
      img.alt = ''; img.decoding = 'async'; img.loading = 'lazy';
      img.onerror = function () { img.remove(); mono(); };
      img.src = 'assets/icons/' + tool.icon;
      wrap.appendChild(img);
    } else mono();
    return wrap;
  };

  /* ---- Magnetic buttons (uses `translate`, so it never fights reveal transforms) ---- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !(window.Motion && window.Motion.reduced)) {
    document.querySelectorAll('.btn--accent, .to-top').forEach(function (el) {
      var raf = 0;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18, y = (e.clientY - r.top - r.height / 2) * 0.28;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () { el.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px'; });
      });
      el.addEventListener('pointerleave', function () { cancelAnimationFrame(raf); el.style.translate = ''; });
    });
  }

  /* ---- Back to top ---- */
  document.querySelectorAll('[data-scroll-top]').forEach(function (b) {
    b.addEventListener('click', function () { window.Motion.scrollTo(0); });
  });
})();
