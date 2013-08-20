"use strict";

function LinearSearch(collection) {
  this.collection = collection;
  this.elem;
};

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

module.exports = LinearSearch;
