// JavaScript utilities used by the OpenDCL documentation files
// Copyright 2008–2026 OpenDCL Consortium
//
// Redirect to the framed help shell if a topic is opened alone.
// GitHub Pages serves index.html (not the old PHP index.php).

(function () {
  var url = window.location;

  // Google Translate proxy (*.translate.goog) loads the topic as a top-level
  // document. Do NOT re-frame into index.html there — that produces
  // …translate.goog/HelpFiles/index.html?lang=… and breaks Translate.
  if (/\.translate\.goog$/i.test(url.hostname || "")) return;
  if (/translate\.google\./i.test(url.hostname || "")) return;

  var path = url.pathname.split("/HelpFiles/")[1];
  if (typeof path === "undefined") return;

  // Only when this topic is the top window (not already in our frameset).
  var isTop = false;
  try {
    isTop = url.href === parent.window.location.href;
  } catch (e) {
    // Cross-origin parent: treat as embedded; do not redirect.
    return;
  }
  if (!isTop) return;

  var qs = url.search ? url.search.substr(1) : "";
  // Explicit opt-out (used when opening a topic for Google Translate).
  if (/(?:^|&)noframes=1(?:&|$)/i.test(qs)) return;

  var lang = path.split("/")[0];
  if (!lang) return;

  var base = url.href.split("/HelpFiles/")[0] + "/HelpFiles/index.html?";
  var newurl = base + "lang=" + encodeURIComponent(lang);
  var page = path.substr(lang.length + 1);
  // Strip our noframes flag from the page path if it was path-encoded oddly.
  if (page) {
    page = page.replace(/\?noframes=1$/i, "");
    newurl += "&page=" + encodeURIComponent(page).replace(/%2F/gi, "/");
  }
  // Drop noframes from forwarded query; keep anything else.
  if (qs) {
    var parts = qs.split("&").filter(function (p) {
      return p && !/^noframes=1$/i.test(p);
    });
    if (parts.length) newurl += "&" + parts.join("&");
  }
  if (url.hash) newurl += "&hash=" + encodeURIComponent(url.hash.substr(1));
  window.location.replace(newurl);
})();
