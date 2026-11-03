/* CONTACT - social links + mailto form (no backend needed) */
(function () {
  'use strict';
  var P = window.PORTFOLIO;
  var links = document.getElementById('social-links');
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var items = [
    { label: 'GitHub', href: P.profile.github || (P.profile.social[0] && P.profile.social[0].href), icon: 'i-github' },
    { label: 'LinkedIn', href: P.profile.linkedin || (P.profile.social[1] && P.profile.social[1].href), icon: 'i-linkedin' },
  ].filter(function (s) { return s.href; });
  if (P.profile.email) items.unshift({ label: P.profile.email, href: 'mailto:' + P.profile.email, icon: 'i-mail' });
  if (!items.length) links.remove();
  items.forEach(function (s) {
    var li = document.createElement('li');
    li.innerHTML = '<a class="btn" href="' + esc(s.href) + '" target="_blank" rel="noopener"><svg><use href="#' + esc(s.icon || 'i-external') + '"/></svg>' + esc(s.label) + '</a>';
    links.appendChild(li);
  });

  var navLinkedin = document.getElementById('nav-linkedin');
  if (navLinkedin && P.profile.linkedin) navLinkedin.href = P.profile.linkedin;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form), name = (f.get('name') || '').trim(), mail = (f.get('email') || '').trim(), msg = (f.get('message') || '').trim();
    var ok = name && /^\S+@\S+\.\S+$/.test(mail) && msg;
    status.className = 'contact__status ' + (ok ? 'is-ok' : 'is-err');
    if (!ok) { status.textContent = 'Please fill in your name, a valid email and a message.'; return; }
    if (!P.profile.email) { status.textContent = 'Almost there. Add your email in javascript/profile.js to receive messages.'; status.className = 'contact__status is-err'; return; }
    var subject = encodeURIComponent('Portfolio message from ' + name);
    var body = encodeURIComponent(msg + '\n\n' + name + ' (' + mail + ')');
    window.location.href = 'mailto:' + P.profile.email + '?subject=' + subject + '&body=' + body;
    status.textContent = 'Opening your email app...';
    form.reset();
  });
})();
