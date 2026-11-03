/* HERO - rotating word, count-up stats, tools strip, neural-network backdrop */
(function () {
  'use strict';
  var P = window.PORTFOLIO, reduce = window.Motion.reduced;

  /* Rotating word (typewriter) */
  var wordEl = document.getElementById('hero-word');
  var words = P.profile.rotatingWords;
  if (wordEl && !reduce && words.length > 1) {
    var wi = 0, ci = words[0].length, del = true;
    setTimeout(function loop() {
      var w = words[wi];
      if (del) { ci--; if (ci <= 0) { del = false; wi = (wi + 1) % words.length; } }
      else { ci++; if (ci >= words[wi].length) { del = true; wordEl.textContent = words[wi]; return setTimeout(loop, 1900); } }
      wordEl.textContent = words[wi].slice(0, Math.max(ci, 0)) || '\u00A0';
      setTimeout(loop, del ? 38 : 70);
    }, 2200);
  }

  /* Count-up stats */
  var counts = { academic: P.academic.length, tools: P.tools.length, projects: P.projects.length };
  var statsEl = document.querySelector('.hero__stats');
  function countUp() {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var to = counts[el.getAttribute('data-count')] || 0, t0 = performance.now(), dur = 1400;
      if (reduce) { el.textContent = to; return; }
      (function step(t) {
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(to * e);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }
  if (statsEl && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { countUp(); cio.disconnect(); } }, { threshold: 0.6 });
    cio.observe(statsEl);
  } else countUp();

  /* Tools strip (duplicated once so the -50% loop is seamless) */
  var track = document.getElementById('strip-track');
  if (track) {
    for (var r = 0; r < 2; r++) {
      var group = document.createElement('ul');
      group.className = 'strip__group';
      if (r) group.setAttribute('aria-hidden', 'true');
      P.tools.forEach(function (t) {
        var li = document.createElement('li');
        li.appendChild(P.toolIcon(t));
        var s = document.createElement('span'); s.textContent = t.name; li.appendChild(s);
        group.appendChild(li);
      });
      track.appendChild(group);
    }
  }

  /* Neural-network backdrop */
  var cv = document.getElementById('hero-net');
  if (!cv) return;
  var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var layers = [4, 6, 6, 3], nodes = [], pulses = [], accent = '#a6f36c', line = 'rgba(255,255,255,.07)', visible = true, raf = 0;

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    accent = cs.getPropertyValue('--accent').trim() || accent;
    line = cs.getPropertyValue('--line').trim() || line;
  }
  function layout() {
    var r = cv.parentElement.getBoundingClientRect();
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = layers.map(function (n, li) {
      var out = [];
      for (var i = 0; i < n; i++) out.push({ x: W * (0.08 + 0.84 * li / (layers.length - 1)), y: H * (0.12 + 0.76 * (i + 0.5) / n), ph: Math.random() * 6 });
      return out;
    });
    if (reduce) draw(0);
  }
  function spawn() {
    var l = Math.floor(Math.random() * (layers.length - 1));
    pulses.push({ l: l, a: Math.floor(Math.random() * nodes[l].length), b: Math.floor(Math.random() * nodes[l + 1].length), t: 0 });
  }
  function draw(time) {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1; ctx.strokeStyle = line;
    ctx.beginPath();
    for (var l = 0; l < nodes.length - 1; l++) nodes[l].forEach(function (a) { nodes[l + 1].forEach(function (b) { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }); });
    ctx.stroke();
    ctx.fillStyle = accent;
    pulses = pulses.filter(function (p) {
      p.t += 0.012;
      var a = nodes[p.l][p.a], b = nodes[p.l + 1][p.b];
      ctx.globalAlpha = Math.sin(Math.PI * Math.min(p.t, 1)) * 0.9;
      ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, 2.6, 0, 6.283); ctx.fill();
      return p.t < 1;
    });
    nodes.forEach(function (layer) { layer.forEach(function (n) {
      ctx.globalAlpha = 0.25 + 0.2 * Math.sin(time / 900 + n.ph);
      ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, 6.283); ctx.fill();
    }); });
    ctx.globalAlpha = 1;
  }
  var last = 0;
  function frame(t) {
    raf = 0;
    if (!visible || document.hidden) return;
    if (t - last > 32) { last = t; if (Math.random() < 0.22 && pulses.length < 14) spawn(); draw(t); }
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf && !reduce) raf = requestAnimationFrame(frame); }
  readColors(); layout();
  window.addEventListener('resize', layout);
  document.addEventListener('themechange', function () { requestAnimationFrame(readColors); });
  document.addEventListener('visibilitychange', start);
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(cv.parentElement);
  start();
})();
