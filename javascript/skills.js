/* SKILLS - renders academic skills + tool cards from profile.js, with category filters */
(function () {
  'use strict';
  var P = window.PORTFOLIO, M = window.Motion;
  var NS = 'http://www.w3.org/2000/svg';

  /* Icon paths (24x24, stroke). Add your own and reference it by name in profile.js */
  var ICONS = {
    brain: 'M9 4a3 3 0 00-3 3 3 3 0 00-2 2.8A3 3 0 005 15a3 3 0 004 4 2.5 2.5 0 003-2V6a2.5 2.5 0 00-3-2zM15 4a3 3 0 013 3 3 3 0 012 2.8A3 3 0 0119 15a3 3 0 01-4 4 2.5 2.5 0 01-3-2',
    chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
    loop: 'M4 12a8 8 0 0113.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 01-13.7 5.6L4 15.500M4 20v-4.500h4.500',
    download: 'M12 3v12M7 10l5 5 5-5M4 20h16',
    layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
    sparkle: 'M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM19 16l.8 2.200L22 19l-2.200.8L19 22l-.8-2.200L16 19l2.200-.8z',
    wrench: 'M14.500 6.500a4 4 0 005 5L21 13l-8 8-4-4 8-8zM3 21l5-5',
    filter: 'M3 5h18l-7 8v6l-4 2v-8z',
    rocket: 'M5 15c-1.500 1.500-2 5-2 5s3.500-.5 5-2M14 4c3-1 6-1 7-1 0 1 0 4-1 7l-7 7-6-6zM12 12l-2-2M15 9.500a1 1 0 100-.01',
    arrow: 'M5 12h14M13 6l6 6-6 6'
  };
  function icon(name) {
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '1.8'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
    var p = document.createElementNS(NS, 'path'); p.setAttribute('d', ICONS[name] || ICONS.sparkle); s.appendChild(p);
    return s;
  }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ---------- Academic ---------- */
  var root = document.getElementById('academic');
  var core = P.academic.filter(function (a) { return a.group === 'core'; });
  var data = P.academic.filter(function (a) { return a.group === 'data'; });
  var delivery = P.academic.filter(function (a) { return a.group === 'delivery'; });
  var n = 0;

  var coreGrid = el('div', 'acad-core');
  core.forEach(function (a, i) {
    var c = el('article', 'acad-card neu');
    c.setAttribute('data-reveal', 'up'); c.setAttribute('data-delay', i * 110);
    var top = el('div', 'acad-card__top');
    var tile = el('span', 'icon-tile'); tile.appendChild(icon(a.icon));
    top.appendChild(tile); top.appendChild(el('span', 'acad-card__num', pad(++n)));
    c.appendChild(top); c.appendChild(el('h4', null, a.title)); c.appendChild(el('p', null, a.text));
    coreGrid.appendChild(c);
  });
  root.appendChild(coreGrid);

  var flow = el('div', 'acad-flow neu-in');
  flow.setAttribute('data-reveal', 'up');
  flow.appendChild(el('p', 'acad-flow__title', 'The data craft behind every model'));
  var steps = el('ol', 'acad-steps');
  data.forEach(function (a, i) {
    var li = el('li', 'acad-step'); li.setAttribute('data-reveal', 'up'); li.setAttribute('data-delay', 150 + i * 100);
    var tile = el('span', 'icon-tile neu-sm'); tile.appendChild(icon(a.icon));
    li.appendChild(tile); li.appendChild(el('b', null, a.title)); li.appendChild(el('small', null, a.text));
    li.insertAdjacentHTML('afterbegin', '<em>' + pad(++n) + '</em>');
    steps.appendChild(li);
  });
  flow.appendChild(steps); root.appendChild(flow);

  delivery.forEach(function (a) {
    var w = el('article', 'acad-wide neu');
    w.setAttribute('data-reveal', 'up');
    var tile = el('span', 'icon-tile'); tile.appendChild(icon(a.icon));
    var txt = el('div', 'acad-wide__text');
    txt.appendChild(el('h4', null, '<span class="acad-card__num">' + pad(++n) + '</span> ' + a.title)); txt.appendChild(el('p', null, a.text));
    var path = el('div', 'acad-wide__path', '<span>Model</span><i></i><span>FastAPI</span><i></i><span>Interface</span>');
    w.appendChild(tile); w.appendChild(txt); w.appendChild(path); root.appendChild(w);
  });

  /* ---------- Tools ---------- */
  var grid = document.getElementById('tools');
  var filters = document.getElementById('tool-filters');
  var cats = ['All'];
  P.tools.forEach(function (t) { if (cats.indexOf(t.cat) < 0) cats.push(t.cat); });

  var cards = P.tools.map(function (t, i) {
    var c = el('article', 'tool-card neu');
    c.setAttribute('data-cat', t.cat);
    c.style.setProperty('--tc', t.color || 'var(--accent)');
    var inner = el('div', 'tool-card__in');
    inner.setAttribute('data-reveal', 'up'); inner.setAttribute('data-delay', (i % 6) * 70);
    inner.appendChild(P.toolIcon(t));
    inner.appendChild(el('b', null, t.name)); inner.appendChild(el('small', null, t.cat));
    c.appendChild(inner); grid.appendChild(c);
    return c;
  });

  cats.forEach(function (cat, i) {
    var b = el('button', 'filter' + (i === 0 ? ' is-active' : ''), cat);
    b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', i === 0);
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(filters.children, function (x) { x.classList.remove('is-active'); x.setAttribute('aria-selected', 'false'); });
      b.classList.add('is-active'); b.setAttribute('aria-selected', 'true');
      var k = 0;
      cards.forEach(function (c) {
        var show = cat === 'All' || c.getAttribute('data-cat') === cat;
        c.hidden = !show;
        if (show) { c.classList.remove('pop'); void c.offsetWidth; c.style.setProperty('--pd', (k++ * 45) + 'ms'); c.classList.add('pop'); }
      });
    });
    filters.appendChild(b);
  });

  M.reveal(root); M.reveal(grid);
})();
