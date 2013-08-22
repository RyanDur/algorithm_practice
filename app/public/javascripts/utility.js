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

var getPosition = function(element) {
  var xPosition = 0;
  var yPosition = 0;

  while(element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }
  return { x: xPosition, y: yPosition  };
};

var swapInnerHTML = function(a, b) {
  var temp = a.innerHTML;
  a.innerHTML = b.innerHTML;
  b.innerHTML = temp;
};

var swap = function(a, b) {
  var temp = a;
  a = b;
  b = temp;
};

var flatten = function(array) {
  var flat = [];
  for (var i = 0, l = array.length; i < l; i++){
    var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
    if (type) {
      flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]);
    }
  }
  return flat;
};

var copyInnerHTML = function(copy, original) {
  copy.innerHTML = original.innerHTML;
};

var executeAsynchronously = function(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
    var time = setTimeout(functions[i], i*timeout);
  }
};

var shuffle = function(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
