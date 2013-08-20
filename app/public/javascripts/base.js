;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var LinearSearch = require('./search/LinearSearch');
var BinarySearch = require('./search/BinarySearch');

var collection = [4,3,6,7,8,9,5,0,1,2];
var sortedCollection = [0,1,2,3,4,5,6,7,8,9];

var time = collection.length*1000;
var ls = new LinearSearch(collection);
var bs = new BinarySearch(sortedCollection);

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {

    var demo0 = document.getElementById('demo0');
    ls.insertInto(demo0);
    ls.search(Math.floor(Math.random() * 10));
    setInterval(function() {ls.search(Math.floor(Math.random() * 10));}, time);

    var demo1 = document.getElementById('demo1');
    bs.insertInto(demo1);
    bs.search(6);
    setInterval(function() {bs.search(Math.floor(Math.random() * 10));}, time);
  }
};

},{"./search/BinarySearch":2,"./search/LinearSearch":3}],2:[function(require,module,exports){
function BinarySearch(collection) {
  this.collection = collection;
  this.elem;
};

BinarySearch.prototype.insertInto = function(elem) {
  appendChildTo(elem, 'ul', 'collection');
  var ul = elem.getElementsByClassName('collection').item(0);

  forEach(this.collection, function(value, index) {
    appendChildTo(ul, 'li', 'index'+ index);
    ul.lastElementChild.innerHTML = value;
  });

  this.elem = elem;
};

var t;

BinarySearch.prototype.search = function(value) {
  var min = 0, lastMid, range;
  var max = this.collection.length-1;
  var elements = this.elem.getElementsByTagName('li');
  clean(elements);

  var t = setInterval(function() {
    var mid = Math.floor((min + max)/2);
    if (max < min) {
      clearInterval(t);
      return;
    }
    if(range) {
      ignore(range, elements);
    }
    if(lastMid) {
      addClass(elements[lastMid], 'ignore');
      removeClass(elements[lastMid], 'search');
    }

    addClass(elements[mid], 'search');

    if(value > elements.item(mid).innerHTML) {
      range = [0,mid];
      lastMid = mid;
      min = mid+1;
    } else if(value < elements.item(mid).innerHTML) {
      range = [mid+1, elements.length];
      lastMid = mid;
      max = mid-1;
    } else {
      addClass(elements[mid], 'found');
      clearInterval(t);
      return;
    }
  }, 2000);
};

var clean = function(elements) {
  forEach(elements, function(el) {
    removeClass(el, 'ignore');
    removeClass(el, 'found');
    removeClass(el, 'search');
  });
};

var ignore = function(range, elements) {
  for(var i = range[0]; i < range[1]; i++) {
    addClass(elements[i], 'ignore');
  }
};

module.exports = BinarySearch;

},{}],3:[function(require,module,exports){
"use strict";

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
  var index = 0;
  var list = this.elem.getElementsByTagName('li');
  forEach(list, function(li) {
    removeClass(li, 'search');
    removeClass(li, 'found');
  });

  var t = setInterval(function() { 
    if(index > 0) {
      removeClass(list[index-1], 'search');
    }
    var li = list[index];

    addClass(li, 'search');

    if (li.innerHTML == value) {
      addClass(li, 'found');
      clearInterval(t);
    }

    index++;
  }, 800);
};

},{}]},{},[1])
;