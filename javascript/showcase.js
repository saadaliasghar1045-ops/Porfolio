/* SHOWCASE - simulated training run drawn on a canvas (illustrative, not a benchmark) */
(function () {
  'use strict';
  var cv = document.getElementById('lab-canvas');
  if (!cv) return;
  var ctx = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0;
  var EPOCHS = 60, PER_SEC = 14;
  var runBtn = document.getElementById('lab-run'), resetBtn = document.getElementById('lab-reset');
  var eEl = document.getElementById('lab-epoch'), lEl = document.getElementById('lab-loss'), aEl = document.getElementById('lab-acc');
  var pts = [], epoch = 0, running = false, raf = 0, t0 = 0, acc0 = 0, colors = {};

  // Deterministic "noisy" curves so every run looks the same
  function noise(i) { return Math.sin(i * 12.9898) * 43758.5453 % 1; }
  function lossAt(e) { return 0.18 + 2.12 * Math.exp(-e / 13) + noise(e) * 0.04 * Math.exp(-e / 40); }
  function accAt(e) { return Math.min(0.97, 0.1 + 0.87 * (1 - Math.exp(-e / 15)) + noise(e + 7) * 0.012); }

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    colors = { loss: cs.getPropertyValue('--c-pink').trim(), acc: cs.getPropertyValue('--accent').trim(), grid: cs.getPropertyValue('--line').trim(), text: cs.getPropertyValue('--text-dim').trim() };
  }
  function resize() {
    var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    var L = 46, R = 18, T = 22, B = 34, w = W - L - R, h = H - T - B;
    ctx.strokeStyle = colors.grid; ctx.lineWidth = 1; ctx.fillStyle = colors.text; ctx.font = '11px Inter, sans-serif';
    for (var g = 0; g <= 4; g++) {
      var y = T + h * g / 4; ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(W - R, y); ctx.stroke();
      ctx.textAlign = 'right'; ctx.fillText((1 - g / 4).toFixed(2), L - 8, y + 4);
    }
    ctx.textAlign = 'center';
    for (var x = 0; x <= 4; x++) ctx.fillText(Math.round(EPOCHS * x / 4), L + w * x / 4, H - 12);
    function line(fn, color, scale) {
      if (pts.length < 2) return;
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.6; ctx.lineJoin = ctx.lineCap = 'round';
      pts.forEach(function (e, i) { var px = L + w * e / EPOCHS, py = T + h * (1 - fn(e) / scale); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
      ctx.stroke();
      var e = pts[pts.length - 1];
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(L + w * e / EPOCHS, T + h * (1 - fn(e) / scale), 5, 0, 6.283); ctx.fill();
    }
    line(lossAt, colors.loss, 2.4);
    line(accAt, colors.acc, 1);
  }
  function readout(e) {
    eEl.textContent = Math.round(e);
    lEl.textContent = lossAt(e).toFixed(3);
    aEl.textContent = Math.round(accAt(e) * 100) + '%';
  }
  function frame(t) {
    var e = Math.min(EPOCHS, acc0 + (t - t0) / 1000 * PER_SEC);
    pts = []; for (var i = 0; i <= Math.floor(e); i++) pts.push(i); if (e % 1) pts.push(e);
    readout(e); draw(); epoch = e;
    if (e >= EPOCHS) { running = false; runBtn.querySelector('span').textContent = 'Train again'; return; }
    raf = requestAnimationFrame(frame);
  }
  function setLabel(txt) { runBtn.querySelector('span').textContent = txt; }
  runBtn.addEventListener('click', function () {
    if (running) { running = false; cancelAnimationFrame(raf); setLabel('Resume'); return; }
    if (epoch >= EPOCHS) epoch = 0;
    acc0 = epoch; t0 = performance.now(); running = true; setLabel('Pause'); raf = requestAnimationFrame(frame);
  });
  resetBtn.addEventListener('click', function () {
    running = false; cancelAnimationFrame(raf); epoch = 0; pts = []; readout(0); setLabel('Train model'); draw();
  });
  readColors(); resize(); readout(0);
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 100); });
  document.addEventListener('themechange', function () { requestAnimationFrame(function () { readColors(); draw(); }); });
})();
