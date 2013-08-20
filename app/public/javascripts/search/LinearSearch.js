"use strict";

function LinearSearch(elem) {
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
