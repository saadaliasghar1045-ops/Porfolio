/* NAVBAR - anchor scrolling, active-section highlight, compact state */
(function () {
  'use strict';
  var nav = document.getElementById('navbar');
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });

  document.querySelectorAll('[data-scroll]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      var el = id && id.charAt(0) === '#' ? document.querySelector(id) : null;
      if (!el) return;
      e.preventDefault();
      var off = id === '#home' ? 0 : id === '#about' ? 0 : -20;
      window.Motion.scrollTo(id === '#home' ? 0 : el, off);
      history.replaceState(null, '', id);
    });
  });

  var activeIdx = -1;
  window.Motion.subscribe(function (y) {
    nav.classList.toggle('is-scrolled', y > 40);
    var line = window.innerHeight * 0.4, idx = 0;
    targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= line) idx = i; });
    if (idx === activeIdx) return;
    activeIdx = idx;
    links.forEach(function (a, i) {
      a.classList.toggle('is-active', i === idx);
      if (i === idx) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  });
})();
