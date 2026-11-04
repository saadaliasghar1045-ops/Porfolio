
/* CONTACT - Social links + FastAPI email submission */
(function () {
  'use strict';

  var P = window.PORTFOLIO;

  var links = document.getElementById('social-links');
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');

  // FastAPI contact endpoint
  var API_URL = 'http://127.0.0.1:8000/contact';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;'
      }[c];
    });
  }

  // Social links
  var items = [
    {
      label: 'GitHub',
      href: P.profile.github || (P.profile.social[0] && P.profile.social[0].href),
      icon: 'i-github'
    },
    {
      label: 'LinkedIn',
      href: P.profile.linkedin || (P.profile.social[1] && P.profile.social[1].href),
      icon: 'i-linkedin'
    },
  ].filter(function (s) {
    return s.href;
  });

  if (P.profile.email) {
    items.unshift({
      label: P.profile.email,
      href: 'mailto:' + P.profile.email,
      icon: 'i-mail'
    });
  }

  if (!items.length) {
    links.remove();
  } else {
    items.forEach(function (s) {
      var li = document.createElement('li');

      li.innerHTML =
        '<a class="btn" href="' + esc(s.href) +
        '" target="_blank" rel="noopener">' +
        '<svg><use href="#' + esc(s.icon || 'i-external') +
        '"/></svg>' + esc(s.label) + '</a>';

      links.appendChild(li);
    });
  }

  // LinkedIn navigation
  var navLinkedin = document.getElementById('nav-linkedin');

  if (navLinkedin && P.profile.linkedin) {
    navLinkedin.href = P.profile.linkedin;
  }

  // Contact form submission
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var f = new FormData(form);

    var name = (f.get('name') || '').trim();
    var mail = (f.get('email') || '').trim();
    var msg = (f.get('message') || '').trim();

    // Validate form
    var ok =
      name.length >= 2 &&
      /^\S+@\S+\.\S+$/.test(mail) &&
      msg.length >= 5;

    if (!ok) {
      status.textContent =
        'Please enter your name, a valid email and a message.';

      status.className = 'contact__status is-err';
      return;
    }

    // Loading state
    var submitButton = form.querySelector('[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    status.textContent = 'Sending your message...';
    status.className = 'contact__status';

    try {
      // Send data to FastAPI
      var response = await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: name,
          email: mail,
          message: msg
        })
      });

      var result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail || 'Unable to send your message.'
        );
      }

      // Success
      status.textContent =
        'Your message has been sent successfully!';

      status.className = 'contact__status is-ok';

      form.reset();

    } catch (error) {
      console.error('Contact form error:', error);

      status.textContent =
        error.message || 'Something went wrong. Please try again.';

      status.className = 'contact__status is-err';

    } finally {
      // Restore button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    }
  });

})();
