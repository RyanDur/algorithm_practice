"use strict";
var swapper = require('../SwapElement');

function SelectionSort(elem, collection) {
  this.demo = false;

  if(collection === undefined) {
    this.demo = true;
    collection =  [9,8,7,6,5,4,3,2,1,0];
  }

  this.elem = appendUnorderedList(elem, collection);
  this.elements = this.elem.getElementsByTagName('li');
  this.collection = collection;

  var ul = this.elem.getElementsByClassName('collection').item(0);
  forEach(['swapA', 'swapB'], function(swap) {
    appendChildTo(ul, 'li', swap);
  });
};

SelectionSort.prototype.sort = function() {
  var queue = [], elements = this.elements, swapA, swapB;

  for(var i = 0; i < this.collection.length-1; i++) {
    var min = i;
    swapA = swapper.element(this.elem, 'swapA', elements[i]);
    queue.push(swapper.addSearch(elements[i]));

    for(var j = i+1; j < this.collection.length; j++) {
      if(this.collection[j] < this.collection[min]) {
        min = j;
        queue.push(swapper.move(elements, j));
      }
    }

    if(min != i) {
      swap(this.collection, i, min);
      queue.push(swapper.addSearch(elements[min]));
      swapB = swapper.element(this.elem, 'swapB', elements[min]);
      queue.push(swapper.steps(swapA, swapB));
    }
  }

  queue.push([swapA.reset, swapB.reset]);
  queue = flatten(queue);
  executeAsynchronously(queue, 500);
};

module.exports = SelectionSort;
