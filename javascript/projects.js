/* PROJECTS - renders stacking project cards from profile.js */
(function () {
  'use strict';
  var P = window.PORTFOLIO, M = window.Motion;
  var host = document.getElementById('project-stack');
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  P.projects.forEach(function (p, i) {
    var card = document.createElement('article');
    card.className = 'pcard neu neu-outline';
    var live = p.link || '#';
    var repo = p.code || '#';
    var links =
      '<a class="btn btn--accent" href="' + esc(live) + '" target="_blank" rel="noopener">Live view <svg><use href="#i-external"/></svg></a>' +
      '<a class="btn" href="' + esc(repo) + '" target="_blank" rel="noopener">GitHub repo <svg><use href="#i-github"/></svg></a>';
    card.innerHTML =
      '<div class="pcard__in" data-reveal="rise">' +
        '<div class="pcard__text">' +
          '<div class="pcard__meta"><span class="pcard__num">' + pad(i + 1) + '</span><span class="chip">' + esc(p.tag) + '</span></div>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p>' + esc(p.text) + '</p>' +
          '<ul class="pcard__stack">' + p.stack.map(function (s) { return '<li class="chip">' + esc(s) + '</li>'; }).join('') + '</ul>' +
          '<div class="pcard__links">' + links + '</div>' +
        '</div>' +
        '<div class="pcard__shot neu-in"><img src="assets/images/' + esc(p.image) + '" alt="' + esc(p.title) + ' screenshot" loading="lazy" /></div>' +
      '</div>' +
      '<span class="pcard__dim" aria-hidden="true"></span>';
    host.appendChild(card);
  });
  M.reveal(host);
  M.refresh();
})();
