;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var LinearSearch = require('./search/LinearSearch');
var BinarySearch = require('./search/BinarySearch');
var BubbleSort = require('./sort/BubbleSort');

var time = 10000;

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    var demo0 = document.getElementById('demo0');
    var ls = new LinearSearch(demo0);
    ls.search(Math.floor(Math.random() * 10));
    setInterval(function() {ls.search(Math.floor(Math.random() * 11));}, time);

    var demo1 = document.getElementById('demo1');
    var bs = new BinarySearch(demo1);
    bs.search(Math.floor(Math.random() * 10));
    setInterval(function() {bs.search(Math.floor(Math.random() * 11));}, time);

    var demo2 = document.getElementById('demo2');
    var bsort = new BubbleSort(demo2);
    bsort.sort();
    setInterval(function() {bsort.sort();}, 160000);
  }
};

},{"./search/BinarySearch":2,"./search/LinearSearch":3,"./sort/BubbleSort":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
    appendChildTo(ul, 'li', 'swapA');
    appendChildTo(ul, 'li', 'swapB');
};

BubbleSort.prototype.sort = function() {
    var queue = [], elements = this.elements, swapA, swapB;

    addClassToCollection(elements, 'ignore', this.length);

    if(this.demo) {
        shuffleInnerHTML(elements, this.length);
        this.collection = resetCollection(elements);
    }

    queue.push(removeIgnore(elements[this.length-1]));

    for(var j = this.length-2; j >= 0; j--) {
        for(var i = j; i < this.length - 1; i++) {
            if(i === j ) {
                queue.push(removeIgnore(elements[i]));
            }
            if(this.collection[i] > this.collection[i+1]) {
                swap(this.collection, i, i+1);
                swapA = swapElement(this.elem, 'swapA', elements[i]);
                swapB = swapElement(this.elem, 'swapB', elements[i+1]);
                queue.push(swapSteps(swapA, swapB));
            } else {
                queue.push(moveSteps(elements, i));
            }
            if(i+1 >= this.length-1) {
                queue.push(clean(elements, this.length));
            }
        }
    }

    queue.push([swapA.reset, swapB.reset]);
    queue = flatten(queue);
    executeAsynchronously(queue, 550);
};

var moveSteps = function(elements, index) {
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
    };
};

var clean = function(elements, length) {
    return function() {
        for(var i = 0; i < length; i++) {
            removeSearch(elements[i]);
        }
    };
};

var swapSteps = function(swapA, swapB) {

    return [function() {
               // travel to swapping positions
               addSearch(swapA.original, swapB.original, swapA.elem, swapB.elem);
               forEach([swapA, swapB], function(swap) {
                swap.moveIntoPosition();
               })

               // place values into swaps
               forEach([swapA, swapB], function(swap) {
                swap.copyInnerHTML();
               });
           },
           function() {
               // replace orginal with swaps that animate
               hide(swapA.original, swapB.original);
               makeVisible(swapA.elem, swapB.elem);
           },
           function() {
               // raise swaps out of the line
               swapA.moveUp();
               swapB.moveDown();
           },
           function() {
               // swap x positions
               swapInnerHTML(swapA.original, swapB.original);
               swapA.moveRight();
               swapB.moveLeft();
           },
           function() {
               // take copies out of the row and swap original
               addSearch(swapB.original);
               removeSearch(swapA.original);

               // place copies back into the row
               forEach([swapA, swapB], function(swap) {
                swap.putBackInLine();
               });
           },
           function() {
               // remove copies and reveal original with swapped values
               removeSearch(swapA.elem, swapB.elem);
               hide(swapA.elem, swapB.elem);
               makeVisible(swapA.original, swapB.original);
           }];
};

var swapElement = function(element, className, original) {
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
};

var executeAsynchronously = function(functions, timeout) {
    for(var i = 0; i < functions.length; i++) {
        var time = setTimeout(functions[i], i*timeout);
    }
};

var addSearch = function() {
    forEach(arguments, function(elem) {
        addClass(elem, 'search');
    });
};

var hide = function() {
    forEach(arguments, function(elem) {
        elem.style.visibility = "hidden";
    });
};

var makeVisible = function() {
    forEach(arguments, function(elem) {
        elem.style.visibility = "visible";
    });
};

var removeSearch = function() {
    forEach(arguments, function(elem) {
        removeClass(elem, 'search');
    });
};

var removeIgnore = function() {
    var array = arguments;
    return function() {
        forEach(array, function(elem) {
            removeClass(elem, 'ignore');
        });
    };
};

module.exports = BubbleSort;

},{}]},{},[1])
;