;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var LinearSearch = require('./search/LinearSearch');

$(function() {
  var ls = new LinearSearch([4,3,6,7,8,9,5,0,1,2]);

  var demo = document.getElementById('demo');
  ls.insertInto(demo);
  ls.search(9);
});

},{"./search/LinearSearch":2}],2:[function(require,module,exports){
function LinearSearch(collection) {
  this.collection = collection;
  this.elem;
};

module.exports = LinearSearch;

LinearSearch.prototype.insertInto = function(elem) {
  appendChildTo(elem, 'ul', 'collection');
  var ul = elem.getElementsByClassName('collection').item(0);

  forEach(this.collection, function(value, index) {
    appendChildTo(ul, 'li', 'index'+ index);
    ul.lastElementChild.innerHTML = value;
  });

  this.elem = elem;
};

LinearSearch.prototype.search = function(value) {
  var list = this.elem.getElementsByTagName('li');

  forEach(list, function(li, index) {
    var t = setTimeout(function() { 
      if(index > 0) {
        removeClass(list[index-1], 'search');
      }

      addClass(li, 'search');

      if (li.innerHTML == value) {
        addClass(li, 'found');
        clearTimeout(t);
      }
    }, index*800);

    if (li.innerHTML == value) {
      return false;
    }
  });
};

},{}]},{},[1])
;