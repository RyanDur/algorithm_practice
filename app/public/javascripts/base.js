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

    this.copy1 = elem.getElementsByClassName('swapA').item(0);
    this.copy2 = elem.getElementsByClassName('swapB').item(0);
    this.copy1OriginalPosition = getPosition(this.copy1);
    this.copy2OriginalPosition = getPosition(this.copy2);
};

BubbleSort.prototype.sort = function() {
    var queue = [];
    var elements = this.elements;

    if(this.demo) {
        shuffleInnerHTML(elements, this.length);
        this.collection = resetCollection(elements);
    }

    for(var j = this.length-2; j >= 0; j--) {
        for(var i = j; i < this.length - 1; i++) {
            if(this.collection[i] > this.collection[i+1]) {
                swap(this.collection, i, i+1);

                var item = animateSwap(this.elem, elements[i], elements[i+1]);
                queue.push(item);
            } else {
                var move = animateMove(elements, i);
                queue.push(move);
            }
            if(i+1 >= this.length-1) {
                queue.push(function(){
                    clean(elements);
                });
            }
        }
    }
    queue.push(resetCopy('swapA'));
    queue.push(resetCopy('swapB'));

    queue = flatten(queue);
    executeAsynchronously(queue, 600);
};

var resetCopy = function(copy) {
    return [function() {
        document.getElementsByClassName(copy).item(0).style.left = 0
    }];
};

var animateMove = function(elements, index) {
    var before = elements[index-1];
    var now = elements[index];
    var after = elements[index+1]
        return [function() {
            addClass(now, 'search');
            addClass(after, 'search');
        },
        function() {
            removeClass(before, 'search');
            addClass(after, 'search');
        }];
};

var clean = function(elements) {
    for(var i = 0; i < elements.length; i++) {
        removeClass(elements[i], 'search');
    }
};

var animateSwap = function(elem, original1, original2) {

    // get references to copies
    var copy1 = elem.getElementsByClassName('swapA').item(0);
    var copy2 = elem.getElementsByClassName('swapB').item(0);

    copy1.innerHTML = 0;
    copy2.innerHTML = 0;

    // get positions of the originals relative to the copies
    var position1 = parseInt(getPosition(original1).x) - parseInt(getPosition(copy1).x);
    var position2 = parseInt(getPosition(original2).x) - parseInt(getPosition(copy2).x);

    return [function() {
               // travel to swapping positions
               copy1.style.left = position1 + "px";
               copy2.style.left = position2 + "px";

               // place values into copies
               copyInnerHTML(copy1, original1);
               copyInnerHTML(copy2, original2);
           },
           function() {
               // replace orginal with copies that animate
               addClass(copy1, 'search');
               addClass(copy2, 'search');

               copy1.style.visibility = "visible";
               copy2.style.visibility = "visible";

               original1.style.visibility = "hidden";
               original2.style.visibility = "hidden";
           },
           function() {
               // take copies out of the row and swap original
               swapInnerHTML(original1, original2);
               addClass(original2, 'search');
               removeClass(original1, 'search');

               copy1.style.top = -original1.offsetHeight + "px";
               copy2.style.top = original2.offsetHeight + "px";
           },
           function() {
               // swap x positions
               copy1.style.left = position2 + copy1.offsetWidth + "px";
               copy2.style.left = position1 - copy2.offsetWidth + "px";
           },
           function() {
               // place copies back into the row
               copy1.style.top = 0;
               copy2.style.top = 0;
           },
           function() {
               // remove copies and reveal original with swapped values

               copy1.style.visibility = "hidden";
               copy2.style.visibility = "hidden";

               original1.style.visibility = "visible";
               original2.style.visibility = "visible";

               removeClass(copy1, 'search');
               removeClass(copy2, 'search');
           }];
};

var executeAsynchronously = function(functions, timeout) {
    for(var i = 0; i < functions.length; i++) {
        var time = setTimeout(functions[i], i*timeout);
    }
};

module.exports = BubbleSort;

},{}]},{},[1])
;