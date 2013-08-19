var forEach = function(collection, func) {
  for(var i = 0; i < collection.length; i++) {
    var val = func(collection[i], i);
    if(val === false) {
      return;
    }
  }
};

var findClass = function(name) {
  return new RegExp('(\\s|^  )'+name+'(\\s|$)');
};

var hasClass = function(el, name) {
  return findClass(name).test(el.className);
};

var addClass = function(el, name) {
  if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
};

var removeClass = function(el, name) {
  if (hasClass(el, name)) {
    el.className=el.className.replace(findClass(name)).replace(/^\s+|\s+$/g, '');
  }
};

var appendChildTo = function(elem, tag, className) {
  var node = document.createElement(tag);
  addClass(node, className);
  elem.appendChild(node);
};
