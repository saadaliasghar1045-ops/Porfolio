/* CONTACT - validates the form and uses a configured API or email fallback. */
(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var links = document.getElementById('social-links');
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  var API_URL = (P.profile.contactEndpoint || '').trim();

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var items = [
    { label: 'GitHub', href: P.profile.github, icon: 'i-github' },
    { label: 'LinkedIn', href: P.profile.linkedin, icon: 'i-linkedin' }
  ].filter(function (item) { return !!item.href; });

  if (P.profile.email) {
    items.unshift({ label: P.profile.email, href: 'mailto:' + P.profile.email, icon: 'i-mail' });
  }

  if (links) {
    if (!items.length) {
      links.remove();
    } else {
      items.forEach(function (item) {
        var li = document.createElement('li');
        li.innerHTML = '<a class="btn" href="' + esc(item.href) + '" target="_blank" rel="noopener noreferrer">' +
          '<svg aria-hidden="true"><use href="#' + esc(item.icon) + '"></use></svg>' + esc(item.label) + '</a>';
        links.appendChild(li);
      });
    }
  }

  var navLinkedin = document.getElementById('nav-linkedin');
  if (navLinkedin && P.profile.linkedin) navLinkedin.href = P.profile.linkedin;
  if (!form || !status) return;

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'contact__status' + (type ? ' is-' + type : '');
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = String(data.get('name') || '').trim();
    var email = String(data.get('email') || '').trim();
    var message = String(data.get('message') || '').trim();

    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
      setStatus('Please enter your name, a valid email address and a message of at least 10 characters.', 'err');
      return;
    }

    // If no backend is configured, use the visitor's email application only
    // when the portfolio owner has supplied a contact email in profile.js.
    if (!API_URL) {
      if (P.profile.email) {
        var subject = 'Portfolio message from ' + name;
        var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
        window.location.href = 'mailto:' + encodeURIComponent(P.profile.email) +
          '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        setStatus('Your email application should open with the message ready to send.', 'ok');
      } else {
        setStatus('The form is not connected yet. Please contact me through GitHub or LinkedIn instead.', 'err');
      }
      return;
    }

    var submit = form.querySelector('[type="submit"]');
    if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }
    setStatus('Sending your message…');

    try {
      var response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, message: message })
      });
      var result = {};
      try { result = await response.json(); } catch (_) {}
      if (!response.ok) throw new Error(result.detail || 'The message could not be sent. Please try again.');
      form.reset();
      setStatus('Your message was sent successfully. Thank you for reaching out!', 'ok');
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus(error.message || 'Something went wrong. Please try again or contact me on LinkedIn.', 'err');
    } finally {
      if (submit) { submit.disabled = false; submit.innerHTML = 'Send message <svg aria-hidden="true"><use href="#i-arrow"></use></svg>'; }
    }
  });
})();
