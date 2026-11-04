/*
 * PORTFOLIO SERVER AWAKENER
 * ------------------------
 * Sends GET requests to wake your deployed APIs
 * when a visitor opens your portfolio.
 *
 * PlanterAI:       GET /
 * CineMatix:       GET /home
 * Contact API:     GET /health
 */

(function () {
  'use strict';

  // Configure your deployed API URLs here.
  var SERVERS = [
    {
      name: 'PlanterAI API',
      url: 'https://crop-recommender-de0b45bd.fastapicloud.dev/Home',
      enabled: true
    },
    {
      name: 'CineMatix API',
      url: 'https://content-based-movie-recommender-api.fastapicloud.dev/home',
      enabled: true
    },
    {
      name: 'Portfolio Contact API',
      url: 'https://form-handler-a3539441.fastapicloud.dev/health',
      enabled: true
    }
  ];

  var TIMEOUT_MS = 90000;

  // Wake an individual server.
  function wakeServer(server) {
    if (
      !server.enabled ||
      !server.url ||
      server.url.indexOf('YOUR-') !== -1
    ) {
      console.warn(
        '[Server Awakener] Configure the URL for:',
        server.name
      );

      return Promise.resolve();
    }

    var controller = new AbortController();

    var timeout = window.setTimeout(function () {
      controller.abort();
    }, TIMEOUT_MS);

    console.info(
      '[Server Awakener] Waking:',
      server.name
    );

    return fetch(server.url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      credentials: 'omit',
      signal: controller.signal
    })

    .then(function () {
      console.info(
        '[Server Awakener] Wake request completed:',
        server.name
      );
    })

    .catch(function (error) {
      if (error && error.name === 'AbortError') {
        console.warn(
          '[Server Awakener] Request timed out:',
          server.name
        );
      } else {
        console.warn(
          '[Server Awakener] Could not reach:',
          server.name,
          error
        );
      }
    })

    .finally(function () {
      window.clearTimeout(timeout);
    });
  }

  // Wake all configured servers simultaneously.
  function wakeAllServers() {
    SERVERS.forEach(function (server) {
      wakeServer(server);
    });
  }

  // Run after the HTML document is ready.
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      wakeAllServers,
      { once: true }
    );
  } else {
    wakeAllServers();
  }

})();