;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Swapper = {
    element: function(element, className, original) {
      var elem = element.getElementsByClassName(className).item(0);
      elem.innerHTML = 0;
      var position = parseInt(getPosition(original).x) - parseInt(getPosition(elem).x);

      return {
        elem: elem,
        original: original,
        moveIntoPosition: function() {
          elem.style.left = position + "px"; 
        },
        moveUp: function() {
          elem.style.top = -original.offsetHeight + "px";
        },
        moveDown: function() {
          elem.style.top = original.offsetHeight + "px";
        },
        moveLeft: function() {
          elem.style.left = position - elem.offsetWidth + "px";
        },
        moveRight: function() {
          elem.style.left = position + elem.offsetWidth + "px";
        },
        putBackInLine: function() {
          elem.style.top = 0;
        },
        copyInnerHTML: function() {
          elem.innerHTML = original.innerHTML;
        },
        reset: function() {
          elem.style.left = 0;
        }
      }
    },

    steps: function(swapA, swapB) {

      return [function stepOne() {
               addSearch(swapA.original, swapB.original, swapA.elem, swapB.elem);
               forEach([swapA, swapB], function(swap) {
                swap.moveIntoPosition();
               })

              forEach([swapA, swapB], function(swap) {
                swap.copyInnerHTML();
              });
            },
            function stepTwo() {
               hide(swapA.original, swapB.original);
              makeVisible(swapA.elem, swapB.elem);
            },
            function stepThree() {
              swapA.moveUp();
              swapB.moveDown();
            },
            function stepFour() {
              swapInnerHTML(swapA.original, swapB.original);
              swapA.moveRight();
              swapB.moveLeft();
            },
            function stepFive() {
              addSearch(swapB.original);
              removeSearch(swapA.original);

              forEach([swapA, swapB], function(swap) {
                swap.putBackInLine();
              });
            },
            function stepSix() {
              removeSearch(swapA.elem, swapB.elem);
               hide(swapA.elem, swapB.elem);
              makeVisible(swapA.original, swapB.original);
            }];
    },

    move: function(elements, index) {
      var now = elements[index];
      var after = elements[index+1];
      if(index-1 > 0) {
        var before = elements[index-1];
      }

      return function() {
        addSearch(now, after);
        if(before) {
          removeSearch(before);
        }
      }
    }
};

module.exports = Swapper;

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

    ls.search(Math.floor(Math.random() * 10));
    setInterval(function() {
      ls.search(Math.floor(Math.random() * 11));
    }, time);

    bs.search(Math.floor(Math.random() * 10));
    setInterval(function() {
      bs.search(Math.floor(Math.random() * 11));
    }, time);

    bsort.sort();
    setInterval(function() {
      bsort.sort();
    }, 150000);
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
};

BinarySearch.prototype.search = function(value) {
  var min = 0, lastMid, range;
  var elements = this.elem.getElementsByTagName('li');
  var max = elements.length-1;
  clean(elements);

  var t = setInterval(function() {
    var mid = Math.floor((min + max)/2);
    if (max < min) {
      clearInterval(t);
      return;
    }
    if(lastMid) {
      addClass(elements[lastMid], 'ignore');
      removeClass(elements[lastMid], 'search');
    }
    if(range) {
      ignore(range, elements);
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
    removeClass(el, 'found');
    removeClass(el, 'search');
    removeClass(el, 'ignore');
  });
};

var ignore = function(range, elements) {
  for(var i = range[0]; i < range[1]; i++) {
    addClass(elements[i], 'ignore');
  }
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
};

LinearSearch.prototype.search = function(value) {
  var index = 0, list = this.elem.getElementsByTagName('li');
  forEach(list, function(li) {
    removeClass(li, 'search');
    removeClass(li, 'found');
  });

  var t = setInterval(function() { 
    if(index >= list.length) {
      removeClass(list[index-1], 'search');
      clearInterval(t);
      return;
    }
    if(index > 0) {
      removeClass(list[index-1], 'search');
    }
    var li = list[index];

    addClass(li, 'search');

    if (li.innerHTML == value) {
      addClass(li, 'found');
      clearInterval(t);
      return;
    }

    index++;
  }, 800);
};

module.exports = LinearSearch;

},{}],5:[function(require,module,exports){
"use strict";
var swapper = require('../SwapElement');

function BubbleSort(elem, collection) {
    this.demo = false;

    if(collection === undefined) {
        this.demo = true;
        collection =  [9,8,7,6,5,4,3,2,1,0];
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

BubbleSort.prototype.sort = function() {
    var queue = [], elements = this.elements, swapA, swapB;

    addClassToCollection(elements, 'ignore', this.length);
    queue.push(removeIgnore(elements[this.length-1]));

    if(this.demo) {
        shuffleInnerHTML(elements, this.length);
        this.collection = resetCollection(elements);
    }

    for(var j = this.length-2; j >= 0; j--) {
        for(var i = j; i < this.length - 1; i++) {
            if(i === j ) {
                queue.push(removeIgnore(elements[i]));
            }
            if(this.collection[i] > this.collection[i+1]) {
                swap(this.collection, i, i+1);
                swapA = swapper.element(this.elem, 'swapA', elements[i]);
                swapB = swapper.element(this.elem, 'swapB', elements[i+1]);
                queue.push(swapper.steps(swapA, swapB));
            } else {
                queue.push(swapper.move(elements, i));
            }
            if(i+1 >= this.length-1) {
                queue.push(clean(elements, this.length));
            }
        }
    }

    queue.push([swapA.reset, swapB.reset]);
    queue = flatten(queue);
    executeAsynchronously(queue, 500);
};

module.exports = BubbleSort;

},{"../SwapElement":1}],6:[function(require,module,exports){
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

},{"../SwapElement":1}]},{},[2])
;