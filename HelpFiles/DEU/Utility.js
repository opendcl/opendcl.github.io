// JavaScript utilities used by the OpenDCL documentation files
// Copyright 2008–2026 OpenDCL Consortium

// En-frame topic pages when opened outside the help frameset.
document.writeln(
  '<script type="text/javascript" src="' +
    window.location.href.split("/HelpFiles/")[0] +
    '/HelpFiles/Framer.js"></scr' +
    "ipt>"
);

/**
 * Copy the text of elem (or its id string) to the clipboard.
 * Buttons call: onclick="copyclip(syntax)" where syntax is the #syntax element.
 */
function copyclip(elem) {
  if (typeof elem === "string") {
    elem = document.getElementById(elem);
  }
  if (!elem) return false;

  var text =
    (elem.innerText !== undefined ? elem.innerText : null) ||
    (elem.textContent !== undefined ? elem.textContent : "") ||
    "";
  text = String(text).replace(/\r\n/g, "\n").replace(/^\s+|\s+$/g, "");
  if (!text) return false;

  function fallbackCopy(str) {
    var ta = document.createElement("textarea");
    ta.value = str;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.width = "1px";
    ta.style.height = "1px";
    ta.style.padding = "0";
    ta.style.border = "none";
    ta.style.outline = "none";
    ta.style.boxShadow = "none";
    ta.style.background = "transparent";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, str.length);
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(text).catch(function () {
      fallbackCopy(text);
    });
    return true;
  }
  return fallbackCopy(text);
}
