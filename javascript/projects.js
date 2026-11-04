/* PROJECTS - renders project cards from the content in profile.js. */
(function () {
  'use strict';
  var P = window.PORTFOLIO;
  var M = window.Motion;
  var host = document.getElementById('project-stack');
  if (!host || !P || !Array.isArray(P.projects)) return;

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  P.projects.forEach(function (project, index) {
    var card = document.createElement('article');
    card.className = 'pcard neu neu-outline';

    var actions = '';
    if (project.link) {
      actions += '<a class="btn btn--accent" href="' + esc(project.link) + '" target="_blank" rel="noopener noreferrer">Live view <svg aria-hidden="true"><use href="#i-external"></use></svg></a>';
    }
    if (project.code) {
      actions += '<a class="btn" href="' + esc(project.code) + '" target="_blank" rel="noopener noreferrer">Source code <svg aria-hidden="true"><use href="#i-github"></use></svg></a>';
    }

    var stack = (project.stack || []).map(function (item) {
      return '<li class="chip">' + esc(item) + '</li>';
    }).join('');

    card.innerHTML =
      '<div class="pcard__in" data-reveal="rise">' +
        '<div class="pcard__text">' +
          '<div class="pcard__meta"><span class="pcard__num">' + pad(index + 1) + '</span><span class="chip">' + esc(project.tag) + '</span></div>' +
          '<h3>' + esc(project.title) + '</h3>' +
          '<p>' + esc(project.text) + '</p>' +
          (project.focus ? '<p class="pcard__focus"><strong>What I worked on:</strong> ' + esc(project.focus) + '</p>' : '') +
          '<ul class="pcard__stack" aria-label="Technologies used">' + stack + '</ul>' +
          (actions ? '<div class="pcard__links">' + actions + '</div>' : '') +
        '</div>' +
        '<div class="pcard__shot neu-in"><img src="assets/images/' + esc(project.image) + '" alt="' + esc(project.title) + ' project interface preview" loading="lazy" /></div>' +
      '</div>';
    host.appendChild(card);
  });

  if (M && M.reveal) { M.reveal(host); if (M.refresh) M.refresh(); }
})();
