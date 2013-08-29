"use strict";

function LinearSearch(elem, collection) {
  var collection = collection;
  if(collection === undefined) {
    collection = [4,3,6,7,8,9,5,0,1,2];
  }
  this.elem = appendUnorderedList(elem, collection);
  this.list = this.elem.getElementsByTagName('li');
};

LinearSearch.prototype.search = function(value) {
  var queue = [];

  forEach(this.list, function(elem, index) {
    queue.push(addSearch(elem));
    if(parseInt(elem.innerHTML) === value) {
      queue.push(found(elem));
      return queue;
    }
    queue.push(removeSearch(elem));
  });

  return queue;
};

LinearSearch.prototype.cleanElements = function() {
  forEach(this.list, function(li) {
    removeClass(li, 'search');
    removeClass(li, 'found');
  });
};

module.exports = LinearSearch;
