/* BIOGRAPHY - scroll-driven portrait expansion + antigravity-style particle field and cursor */
(function () {
  'use strict';
  var section = document.getElementById('about');
  if (!section) return;
  var stage = section.querySelector('.bio__stage');
  var giantSpan = section.querySelector('.bio__giant span');
  var headItems = section.querySelectorAll('.bio__copy .eyebrow, .bio__title');
  var lines = section.querySelectorAll('.bio__line');
  var hint = section.querySelector('.bio__hint');
  var cv = section.querySelector('.bio__field');
  var cursor = section.querySelector('.bio__cursor');
  var M = window.Motion;
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

  /* Thresholds (0-1 along the pinned scroll) at which each text block appears */
  var HEAD_AT = 0.46, STEPS = [0.52, 0.68, 0.84];

  /* Make the giant word fill the screen width exactly */
  function fitGiant() {
    giantSpan.style.fontSize = '100px';
    var w = giantSpan.getBoundingClientRect().width || 1;
    giantSpan.style.fontSize = (100 * (window.innerWidth * 0.94) / w).toFixed(1) + 'px';
  }
  fitGiant();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitGiant);

  /* Start zoomed out so the whole portrait is visible inside the small card */
  function startScale(sx, sy) {
    var vw = window.innerWidth, vh = window.innerHeight, cover = Math.max(vw, vh);
    var cw = vw * (1 - 2 * sx / 100), ch = vh * (1 - 2 * sy / 100);
    return Math.min(1, Math.max(cw, ch) / cover * 1.04);
  }
  var narrow = function () { return window.innerWidth <= 760; };
  var last = {};
  function setVar(k, v) { if (last[k] !== v) { last[k] = v; stage.style.setProperty(k, v); } }

  M.subscribe(function () {
    var r = section.getBoundingClientRect();
    var total = section.offsetHeight - window.innerHeight;
    var p = M.clamp(-r.top / total, 0, 1);
    var e = ease(M.clamp(p / 0.42, 0, 1));
    var sx = narrow() ? 12 : 33, sy = narrow() ? 20 : 13;
    setVar('--ix', lerp(sx, 0, e).toFixed(2) + '%');
    setVar('--iy', lerp(sy, 0, e).toFixed(2) + '%');
    setVar('--ir', lerp(34, 0, e).toFixed(1) + 'px');
    setVar('--is', lerp(startScale(sx, sy), 1, e).toFixed(3));
    setVar('--giant', (1 - M.clamp((p - 0.06) / 0.3, 0, 1)).toFixed(3));
    setVar('--shade', M.clamp((p - 0.28) / 0.25, 0, 1).toFixed(3));
    for (var h = 0; h < headItems.length; h++) headItems[h].classList.toggle('is-on', p >= HEAD_AT);
    var active = -1;
    for (var s = 0; s < STEPS.length; s++) if (p >= STEPS[s]) active = s;
    for (var i = 0; i < lines.length; i++) {
      lines[i].classList.toggle('is-on', i === active);
      lines[i].classList.toggle('is-past', i < active);
    }
    if (hint) hint.style.opacity = p > 0.04 ? 0 : 1;
  });

  /* ---------------- Particle field ---------------- */
  var ctx = cv.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var W = 0, H = 0, dashes = [], accent = '#a6f36c';
  var mouse = { x: -999, y: -999, sx: -999, sy: -999, on: false, k: 0 };
  var running = false, raf = 0, inView = false, cx = -999, cy = -999;
  var RADIUS = 230;

  function readColor() { accent = getComputedStyle(stage).getPropertyValue('--accent').trim() || accent; }
  function resize() {
    var r = stage.getBoundingClientRect();
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var s = W < 760 ? 30 : 40; dashes = [];
    for (var y = s / 2; y < H; y += s) for (var x = s / 2; x < W; x += s) dashes.push(x, y);
    RADIUS = W < 760 ? 150 : 230;
  }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round'; ctx.strokeStyle = accent; ctx.lineWidth = 2;
    // Smooth the pointer; fade influence in/out
    mouse.k += ((mouse.on ? 1 : 0) - mouse.k) * 0.08;
    mouse.sx += (mouse.x - mouse.sx) * 0.16; mouse.sy += (mouse.y - mouse.sy) * 0.16;
    var time = t / 1700, n = dashes.length, i, x, y, dx, dy, d, inf, a, len;

    ctx.globalAlpha = 0.16; ctx.beginPath();
    var infl = [];
    for (i = 0; i < n; i += 2) {
      x = dashes[i]; y = dashes[i + 1];
      dx = mouse.sx - x; dy = mouse.sy - y; d = Math.sqrt(dx * dx + dy * dy);
      inf = d < RADIUS ? (1 - d / RADIUS) * mouse.k : 0;
      if (inf > 0.02) { infl.push(x, y, dx, dy, d, inf); continue; }
      a = Math.sin(x * 0.006 + time) + Math.cos(y * 0.006 - time * 0.8);
      ctx.moveTo(x - Math.cos(a) * 4, y - Math.sin(a) * 4); ctx.lineTo(x + Math.cos(a) * 4, y + Math.sin(a) * 4);
    }
    ctx.stroke();
    for (i = 0; i < infl.length; i += 6) {
      x = infl[i]; y = infl[i + 1]; d = infl[i + 4] || 1; inf = infl[i + 5];
      a = Math.atan2(infl[i + 3], infl[i + 2]);
      len = 4 + inf * 14;
      // Anti-gravity: dashes are pushed away from the pointer while turning toward it
      var px = x - (infl[i + 2] / d) * inf * 30, py = y - (infl[i + 3] / d) * inf * 30;
      ctx.globalAlpha = 0.3 + inf * 0.7;
      ctx.beginPath();
      ctx.moveTo(px - Math.cos(a) * len / 2, py - Math.sin(a) * len / 2); ctx.lineTo(px + Math.cos(a) * len / 2, py + Math.sin(a) * len / 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // Custom cursor
    cx += (mouse.x - cx) * 0.3; cy += (mouse.y - cy) * 0.3;
    cursor.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
  }
  function loop(t) { raf = 0; if (!inView || document.hidden) { running = false; return; } draw(t); raf = requestAnimationFrame(loop); }
  function start() { if (!running && !M.reduced) { running = true; raf = requestAnimationFrame(loop); } }

  function local(e) { var r = stage.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
  stage.addEventListener('pointerenter', function (e) {
    var p = local(e); mouse.x = mouse.sx = cx = p[0]; mouse.y = mouse.sy = cy = p[1]; mouse.on = true;
    cursor.classList.add('is-active'); cursor.classList.remove('is-intro'); void cursor.offsetWidth; cursor.classList.add('is-intro');
  });
  stage.addEventListener('pointermove', function (e) { var p = local(e); mouse.x = p[0]; mouse.y = p[1]; mouse.on = true; if (e.pointerType !== 'mouse') cursor.classList.remove('is-active'); });
  stage.addEventListener('pointerleave', function () { mouse.on = false; cursor.classList.remove('is-active'); });

  resize(); readColor();
  var rt = 0;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { resize(); fitGiant(); }, 120); });
  document.addEventListener('themechange', function () { requestAnimationFrame(readColor); });
  document.addEventListener('visibilitychange', start);
  new IntersectionObserver(function (en) { inView = en[0].isIntersecting; if (inView) start(); }, { rootMargin: '10% 0px' }).observe(section);
  if (M.reduced) draw(0);
})();
