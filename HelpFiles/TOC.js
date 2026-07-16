//support for IE4, which doesn't have document.getElementById()
if (!document.getElementById)
  document.getElementById = function(id) { if (document.all) return document.all[id]; }

function toggleSub(submenu) {
  var menu = document.getElementById(submenu);
  if (!menu)
    return false;
  if (menu.style.display == 'none')
    menu.style.display = 'block';
  else
    menu.style.display = 'none';
  return false;
}

function getWindowSize(window) {
  var res = new Object();
  res.x = 0; res.y = 0;
  if (typeof (window.innerWidth) == 'number') {
    //Non-IE
    res.x = window.innerWidth;
    res.y = window.innerHeight;
  } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
    //IE 6+ in 'standards compliant mode'
    res.x = document.documentElement.clientWidth;
    res.y = document.documentElement.clientHeight;
  } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    //IE 4 compatible
    res.x = document.body.clientWidth;
    res.y = document.body.clientHeight;
  }
  return res;
}

function getWindowScrollXY(window) {
  var res = new Object();
  res.x = 0; res.y = 0;
  if (typeof (window.pageYOffset) == 'number') {
    //Netscape compliant
    res.y = window.pageYOffset;
    res.x = window.pageXOffset;
  } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
    //DOM compliant
    res.y = document.body.scrollTop;
    res.x = document.body.scrollLeft;
  } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
    //IE6 standards compliant mode
    res.y = document.documentElement.scrollTop;
    res.x = document.documentElement.scrollLeft;
  }
  return res;
}

var __isFireFox = navigator.userAgent.match(/gecko/i);
function getElementPos(element) {
  var res = new Object();
  res.x = 0; res.y = 0;
  if (element !== null) {
    res.x = element.offsetLeft;
    res.y = element.offsetTop;

    var offsetParent = element.offsetParent;
    var parentNode = element.parentNode;

    while (offsetParent !== null) {
      res.x += offsetParent.offsetLeft;
      res.y += offsetParent.offsetTop;

      if (offsetParent != document.body && offsetParent != document.documentElement) {
        res.x -= offsetParent.scrollLeft;
        res.y -= offsetParent.scrollTop;
      }
      //next lines are necessary to support FireFox problem with offsetParent
      if (__isFireFox) {
        while (offsetParent != parentNode && parentNode !== null) {
          res.x -= parentNode.scrollLeft;
          res.y -= parentNode.scrollTop;

          parentNode = parentNode.parentNode;
        }
      }
      parentNode = offsetParent.parentNode;
      offsetParent = offsetParent.offsetParent;
    }
  }
  return res;
}

function getElementSize(element) {
  var res = new Object();
  res.x = 0; res.y = 0;
  if (element) {
    if (element.offsetWidth)
      res.x = element.offsetWidth;
    else
      res.x = element.style.pixelWidth;
    if (element.offsetHeight)
      res.y = element.offsetHeight;
    else
      res.y = element.style.pixelHeight;
  }
  return res;
}

function isScrolledIntoView(elem) {
  var docScrollXY = getWindowScrollXY(window);
  var docSize = getWindowSize(window);
  var elemPos = getElementPos(elem);
  var elemSize = getElementSize(elem);
  var docViewTop = docScrollXY.y;
  var docViewBottom = docViewTop + docSize.y;
  var elemTop = elemPos.y;
  var elemBottom = elemTop + elemSize.y;
  return ((elemTop >= docViewTop) && (elemBottom <= docViewBottom));
}

function showMenuItem(menuitem) {
  if (!menuitem)
    return;
  var menuparent = document.getElementById('@' + menuitem.href);
  if (!menuparent)
    menuparent = menuitem.parentNode.parentNode;
  while (menuparent && menuparent.id) {
    menuparent.style.display = 'block';
    menuparent = menuparent.parentNode.parentNode;
  }
  if (!isScrolledIntoView(menuitem))
    window.location.hash = menuitem.id;
}

function activateMenuItem(menuitem) {
  if (this.lastActive && this.lastActive != menuitem)
    this.lastActive.style.backgroundColor = "";
  this.lastActive = menuitem;
  if (!menuitem)
    return;
  menuitem.style.backgroundColor = "#D4D4D4";
}

function onTopicChanged(topic) {
  var page = topic.location.pathname.match('HelpFiles/.../([^\?]*)')[1];
  if (topic.location.hash)
    page += topic.location.hash;
  var menuitem = document.getElementById(page);
  showMenuItem(menuitem);
  activateMenuItem(menuitem);
}

if (parent) parent.onTopicChanged = onTopicChanged;

function onLinkClicked(e) {
  if (e.srcElement)
    activateMenuItem(e.srcElement)
  else if (e.target)
    activateMenuItem(e.target)
  return true;
}

window.onload = function() {
  var myPath = window.location.pathname.match('^.*/');
  var allLinks = document.getElementsByTagName('a');
  for (var i = allLinks.length - 1; i >= 0; --i) {
    var lnk = allLinks[i];
    if (lnk.className != "expander") {
      lnk.id = lnk.href.split(myPath)[1];
      lnk.title = lnk.innerHTML.replace( /[\s]+/g, ' ' );
      if (lnk.addEventListener)
        lnk.addEventListener("click", onLinkClicked, false);
      else if (lnk.attachEvent)
        lnk.attachEvent("onclick", onLinkClicked);
    }
  }
}