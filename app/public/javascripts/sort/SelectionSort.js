"use strict";
var swapper = require('../SwapElement');

function SelectionSort(elem, collection) {
  this.collection = collection;

  if(collection === undefined) {
    this.demo = true;
    collection =  [9,8,7,6,5,4,3,2,1,0];
  }

  this.elem = appendUnorderedList(elem, collection);

  var ul = this.elem.getElementsByClassName('collection').item(0);
  forEach(['swapA', 'swapB'], function(swap) {
    appendChildTo(ul, 'li', swap);
  });
};

SelectionSort.prototype.sort = function() {
  var queue = [], elements = this.elements, swapA, swapB;

  for(var i = 0; i < collection.length-1; i++) {
    var min = i;

    for(var j = i+1; j < container.length-1; j++) {
      if(collection[j] < collection[min]) {
        min = j;
      }
    }

    if(min != i) {
      swap(collection, i, min);
    }
  }
  return collection;
};

module.exports = SelectionSort;
