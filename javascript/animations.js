/* ==========================================================================
   ANIMATIONS  -  the single engine for smooth scroll, reveals, parallax and
   stacking cards across the whole site. Tune the numbers in CONFIG.
   (Visual timing lives in stylesheets/animations.css)

   HTML hooks
     data-reveal="up|down|left|right|scale|fade|rise"   reveal when scrolled into view
     data-delay="300"                                    extra delay in ms
     data-stagger                                        on a parent: children reveal in sequence
     data-split                                          word-by-word mask reveal for headings
     data-parallax="0.1"                                 drift while scrolling (+/- speed)
     data-stack                                          children stick and stack like github.com
   ========================================================================== */
(function () {
  'use strict';

  var CONFIG = {
    smoothScroll: true, // inertial wheel scrolling (desktop mouse/trackpad only)
    smoothEase: 0.095, // 0.05 = floaty, 0.2 = snappy
    wheelSpeed: 1, // wheel distance multiplier
    revealThreshold: 0.12, // how much of an element must be visible
    revealMargin: '0px 0px -7% 0px',
    stagger: 95, // ms between staggered children
    stackScale: 0.06, // how much earlier stacked cards shrink
    stackDim: 0.55, // how much earlier stacked cards darken (0-1)
  };

  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ---------------- frame subscribers (called every scroll frame) ---------------- */
  var subs = [];
  var lastY = -1, pending = false;
  function run(force) {
    pending = false;
    var y = window.pageYOffset;
    if (!force && y === lastY) return;
    lastY = y;
    for (var i = 0; i < subs.length; i++) subs[i](y);
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(function () { run(false); }); } }

  /* ---------------- smooth scroll ---------------- */
  var smooth = CONFIG.smoothScroll && finePointer && !reduce;
  var target = window.pageYOffset, current = target, ticking = false;
  var maxScroll = function () { return Math.max(0, doc.scrollHeight - window.innerHeight); };

  function tick() {
    var diff = target - current;
    if (Math.abs(diff) < 0.4) { current = target; window.scrollTo(0, current); ticking = false; run(false); return; }
    current += diff * CONFIG.smoothEase;
    window.scrollTo(0, current);
    run(false);
    requestAnimationFrame(tick);
  }
  function startTick() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }

  if (smooth) {
    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.defaultPrevented) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.target.closest && e.target.closest('textarea, [data-native-scroll]')) return;
      e.preventDefault();
      var d = e.deltaMode === 1 ? e.deltaY * 34 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      if (!ticking) { current = target = window.pageYOffset; }
      target = clamp(target + d * CONFIG.wheelSpeed, 0, maxScroll());
      startTick();
    }, { passive: false });
  }
  window.addEventListener('scroll', function () {
    // A scroll we did not cause (keyboard, scrollbar drag, touch): adopt it.
    if (!ticking || Math.abs(window.pageYOffset - current) > 3) { target = current = window.pageYOffset; ticking = false; }
    schedule();
  }, { passive: true });

  function scrollTo(dest, offset) {
    var y = typeof dest === 'number' ? dest : dest.getBoundingClientRect().top + window.pageYOffset;
    y = clamp(y + (offset || 0), 0, maxScroll());
    if (smooth) { if (!ticking) current = window.pageYOffset; target = y; startTick(); }
    else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }

  /* ---------------- reveal ---------------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { threshold: CONFIG.revealThreshold, rootMargin: CONFIG.revealMargin }) : null;

  function splitWords(el) {
    if (el.__split) return; el.__split = true;
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.nodeValue.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
            var wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = part;
            wi.style.setProperty('--wi', n++); w.appendChild(wi); frag.appendChild(w);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(el);
  }

  function reveal(scope) {
    scope = scope || document;
    var items = scope.querySelectorAll('[data-reveal], [data-split]');
    Array.prototype.forEach.call(items, function (el) {
      if (el.__rv) return; el.__rv = true;
      if (el.hasAttribute('data-split')) splitWords(el);
      var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      var p = el.parentElement;
      if (p && p.hasAttribute('data-stagger')) {
        var sibs = Array.prototype.filter.call(p.children, function (c) { return c.hasAttribute('data-reveal'); });
        delay += sibs.indexOf(el) * CONFIG.stagger;
      }
      if (delay) el.style.setProperty('--rv-delay', delay + 'ms');
      if (io && !reduce) io.observe(el); else el.classList.add('is-in');
    });
    Array.prototype.forEach.call(scope.querySelectorAll('[data-parallax]'), registerParallax);
  }

  /* ---------------- parallax (uses the independent `translate` property) ---------------- */
  var parallaxEls = [], visibleParallax = new Set();
  var pio = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { en.isIntersecting ? visibleParallax.add(en.target) : visibleParallax.delete(en.target); });
  }, { rootMargin: '20% 0px' }) : null;
  function registerParallax(el) {
    if (el.__px || reduce || !pio) return; el.__px = true;
    el.__speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
    parallaxEls.push(el); pio.observe(el);
  }
  subs.push(function () {
    if (!visibleParallax.size) return;
    var vh = window.innerHeight, reads = [];
    visibleParallax.forEach(function (el) {
      var r = (el.parentElement || el).getBoundingClientRect();
      reads.push([el, (r.top + r.height / 2 - vh / 2) * el.__speed]);
    });
    reads.forEach(function (x) { x[0].style.translate = '0 ' + x[1].toFixed(1) + 'px'; });
  });

  /* ---------------- stacking cards ---------------- */
  var stacks = [];
  function initStacks() {
    stacks = Array.prototype.map.call(document.querySelectorAll('[data-stack]'), function (c) { return c; });
    stacks.forEach(function (c) { Array.prototype.forEach.call(c.children, function (k, i) { k.style.setProperty('--i', i); }); });
    measureStacks();
  }
  // sticky `top` offsets only change on resize, so read them once here instead of every frame
  function measureStacks() {
    stacks.forEach(function (c) { c.__tops = Array.prototype.map.call(c.children, function (k) { return parseFloat(getComputedStyle(k).top) || 0; }); });
  }
  subs.push(function () {
    if (reduce) return;
    var vh = window.innerHeight;
    stacks.forEach(function (c) {
      var kids = c.children, cr = c.getBoundingClientRect();
      if (cr.bottom < -200 || cr.top > vh + 200) return;
      var tops = c.__tops, heights = [], rects = [];
      for (var i = 0; i < kids.length; i++) { rects.push(kids[i].getBoundingClientRect()); heights.push(rects[i].height); }
      for (var k = 0; k < kids.length - 1; k++) {
        var from = tops[k] + heights[k], to = tops[k + 1];
        var p = clamp((from - rects[k + 1].top) / Math.max(1, from - to), 0, 1);
        kids[k].style.transform = 'scale(' + (1 - p * CONFIG.stackScale).toFixed(4) + ')';
        kids[k].style.setProperty('--dim', (p * CONFIG.stackDim).toFixed(3));
      }
    });
  });

  /* ---------------- progress bar ---------------- */
  var bar = document.querySelector('.scroll-progress');
  subs.push(function (y) { if (bar) bar.style.transform = 'scaleX(' + clamp(y / (maxScroll() || 1), 0, 1).toFixed(4) + ')'; });

  window.addEventListener('resize', function () { measureStacks(); run(true); }, { passive: true });
  window.addEventListener('load', function () { run(true); });

  /* ---------------- public API ---------------- */
  window.Motion = {
    config: CONFIG,
    reveal: reveal,
    scrollTo: scrollTo,
    subscribe: function (fn) { subs.push(fn); fn(window.pageYOffset); },
    refresh: function () { initStacks(); run(true); },
    clamp: clamp,
    reduced: reduce,
  };

  initStacks();
  reveal(document);
  run(true);
})();
