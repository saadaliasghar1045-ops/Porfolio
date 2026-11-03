/* EXPERIENCE - renders the journey timeline and fills its line as you scroll */
(function () {
  'use strict';
  var P = window.PORTFOLIO, M = window.Motion;
  var list = document.getElementById('timeline');
  var fill = list.querySelector('.timeline__line i');
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var items = P.timeline.map(function (t, i) {
    var li = document.createElement('li');
    li.className = 'tl-item ' + (i % 2 ? 'is-right' : 'is-left') + (i === P.timeline.length - 1 ? ' is-now' : '');
    li.innerHTML =
      '<span class="tl-dot" aria-hidden="true"></span>' +
      '<div class="tl-card neu" data-reveal="' + (i % 2 ? 'right' : 'left') + '">' +
        '<span class="tl-when">' + esc(t.when) + '</span><h3>' + esc(t.title) + '</h3><p>' + esc(t.text) + '</p>' +
      '</div>';
    list.appendChild(li);
    return li;
  });
  M.reveal(list);

  M.subscribe(function () {
    var r = list.getBoundingClientRect(), vh = window.innerHeight, mid = vh * 0.55;
    var p = M.clamp((mid - r.top) / r.height, 0, 1);
    fill.style.transform = 'scaleY(' + p.toFixed(4) + ')';
    items.forEach(function (li) { li.classList.toggle('is-reached', li.getBoundingClientRect().top < mid); });
  });
})();
