;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";

var LinearSearch = require('./search/LinearSearch');
var BinarySearch = require('./search/BinarySearch');
var BubbleSort = require('./sort/BubbleSort');
var SelectionSort = require('./sort/SelectionSort');

var time = 10000;

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    var demo0 = document.getElementById('demo0');
    var demo1 = document.getElementById('demo1');
    var demo2 = document.getElementById('demo2');
    var demo3 = document.getElementById('demo3');

    var ls = new LinearSearch(demo0);
    var bs = new BinarySearch(demo1);
    var bsort = new BubbleSort(demo2);
    var ss = new SelectionSort(demo3);

    executeAsynchronously(ls.search(Math.floor(Math.random() * 10)), 400);
    setInterval(function() {
      ls.cleanElements();
      executeAsynchronously(ls.search(Math.floor(Math.random() * 11)), 400);
    }, time);

    executeAsynchronously(bs.search(Math.floor(Math.random() * 10)), 1000);
    setInterval(function() {
      bs.cleanElements();
      executeAsynchronously(bs.search(Math.floor(Math.random() * 11)), 1000);
    }, time);

    executeAsynchronously(bsort.sort(), 550);
    setInterval(function() {
      bsort.reset();
      executeAsynchronously(bsort.sort(), 550);
    }, 160000);

    /*
    ss.sort();
  */
  }
};

},{"./search/BinarySearch":3,"./search/LinearSearch":4,"./sort/BubbleSort":5,"./sort/SelectionSort":6}],3:[function(require,module,exports){
"use strict";

function BinarySearch(elem, collection) {
    var collection = collection;
    if(collection === undefined) {
        collection = [0,1,2,3,4,5,6,7,8,9];
    }
    this.elem = appendUnorderedList(elem, collection);
    this.elements = this.elem.getElementsByTagName('li');
};

BinarySearch.prototype.search = function(value) {
    var min = 0, max = this.elements.length-1, mid, range, queue = [];

    while(max >= min) {
        mid = Math.floor((min + max)/2);
        queue.push(search(this.elements[mid]));

        if(value > parseInt(this.elements[mid].innerHTML)) {
            min = mid+1;
            queue.push(ignore([0, min], this.elements, this.elements[mid]));
        } else if(value < parseInt(this.elements[mid].innerHTML)) {
            max = mid-1;
            queue.push(ignore([mid, this.elements.length], this.elements, this.elements[mid]));
        } else {
            queue.push(found(this.elements[mid]));
            return queue;
        }
    };

    return queue;
};

BinarySearch.prototype.cleanElements = function() {
    forEach(this.elements, function(el) {
        removeClass(el, 'found');
        removeClass(el, 'search');
        removeClass(el, 'ignore');
    });
};

var search = function(elem) {
    return function() {
        addClass(elem, 'search');
    }
};

var ignore = function(range, elements, elem) {
    return function() {
        removeClass(elem, 'search');
        for(var i = range[0]; i < range[1]; i++) {
            addClass(elements[i], 'ignore');
        }
    }
};

var found = function(elem) {
    return function() {
        addClass(elem, 'found');
    }
};

var clean = function(elements) {
};

module.exports = BinarySearch;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
var swapper;

function BubbleSort(elem, collection, swapper) {
    if(collection === undefined) {
        collection = [9,8,7,6,5,4,3,2,1,0];
    }

    this.elem = appendUnorderedList(elem, collection);
    this.elements = this.elem.getElementsByTagName('li');
    this.collection = collection;
    this.length = collection.length;

    var ul = this.elem.getElementsByClassName('collection').item(0);
    forEach(['swapA', 'swapB'], function(swap) {
        appendChildTo(ul, 'li', swap);
    });
};

var element = function(elem) {
    return {
        getClass: function(className){
            return elem.getElementsByClassName(className).item(0);
        }
    }
};

BubbleSort.prototype.sort = function() {
    var queue = [], elements = this.elements, swapA, swapB;
    var elem = element(this.elem);
    var elemA = elem.getClass('swapA');
    var elemB = elem.getClass('swapB')

    addClassToCollection(elements, 'ignore', this.length);
    queue.push(removeIgnore(elements[this.length-1]));

    for(var j = this.length-2; j >= 0; j--) {
        for(var i = j; i < this.length - 1; i++) {
            if(i === j) {
                queue.push(removeIgnore(elements[i]));
            }
            if(this.collection[i] > this.collection[i+1]) {
                swap(this.collection, i, i+1);
                swapA = swapElement(elemA, elements[i]);
                swapB = swapElement(elemB, elements[i+1]);
                queue.push(steps(swapA, swapB));
            } else {
                queue.push(move(elements, i, this.length));
            }
        }
    }

    if(swapA != undefined) {
        queue.push([swapA.reset, swapB.reset]);
    }
    return flatten(queue);
};

BubbleSort.prototype.reset = function() {
    shuffleInnerHTML(this.elements, this.length);
    this.collection = resetCollection(this.elements);
};

module.exports = BubbleSort;

},{}],6:[function(require,module,exports){
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

},{"../SwapElement":1}]},{},[2])
;