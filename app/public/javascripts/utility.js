"use strict";

var forEach = function(collection, func) {
  for(var i = 0; i < collection.length; i++) {
    var val = func(collection[i], i);
    if(val === false) {
      return;
    }
  }
};

var find = function(name) {
  return new RegExp('(\\s|^  )'+name+'(\\s|$)');
};

var hasClass = function(el, name) {
  return new RegExp('(\\s|^ )'+name+'(\\s|$)').test(el.className);
};

var addClass = function(el, name) {
  if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
};

var removeClass = function(el, name) {
  if (hasClass(el, name)) {
    el.className=el.className.replace(new RegExp('(\\s|^ )'+name+'(\\s|$)' ),' ').replace(/^\s+|\s+$/g, '');
  }
};

var appendChildTo = function(elem, tag, className) {
  var node = document.createElement(tag);
  addClass(node, className);
  elem.appendChild(node);
};

var appendUnorderedList = function(elem, collection) {
  appendChildTo(elem, 'ul', 'collection');
  var ul = elem.getElementsByClassName('collection').item(0);

  forEach(collection, function(value, index) {
    appendChildTo(ul, 'li', 'index'+ index);
    ul.lastElementChild.innerHTML = value;
  });

  return elem;
};
