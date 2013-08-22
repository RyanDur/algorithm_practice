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
    var bsort = new BubbleSort(demo2, [9,8,7,6,5,4,3,2,1,0]);
    bsort.sort();
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
    this.elem = appendUnorderedList(elem, collection);
};

BubbleSort.prototype.sort = function() {
    var elements = this.elem.getElementsByTagName('li');
    var i = elements.length-2;
    var j = i;
    /*
     var time1 = setInterval(function() {
        var j = i;

        addClass(elements[j], 'search');
        addClass(elements[j+1], 'search');
        var time2 = setInterval(function() {
            if(i < 0 && j > elements.length-2) {
                clearInterval(time1);
                clearInterval(time2);
                return
            }
            if(j > elements.length-2) {
                clearInterval(time2);
                return;
            }
            if(elements[j].innerHTML > elements[j+1].innerHTML) {
                swap(elements, j, j+1);
            }
            j++;
            removeClass(elements[j-1], 'search');
            removeClass(elements[j], 'search');
            if(j+1 < elements.length) {
                addClass(elements[j+1], 'search');
            }

        }, 1000);
        i--;
    }, 3000);
    */

    animateSwap(this.elem, elements[0], elements[9]);
};

var animateSwap = function(elem, original1, original2) {
    // add copies to list
    var ul = elem.getElementsByClassName('collection').item(0);
    appendChildTo(ul, 'li', 'swapA');
    appendChildTo(ul, 'li', 'swapB');

    // get references to copies
    var copy1 = elem.getElementsByClassName('swapA').item(0);
    var copy2 = elem.getElementsByClassName('swapB').item(0);

    // place values into copies
    copy1.innerHTML = original1.innerHTML;
    copy2.innerHTML = original2.innerHTML;

    // get positions of the originals relative to the copies
    var position1 = parseInt(getPosition(original1).x) - parseInt(getPosition(copy1).x);
    var position2 = parseInt(getPosition(original2).x) - parseInt(getPosition(copy2).x);

    executeAsynchronously(
    [function() {
        // travel to swapping positions
        copy1.style.left = position1 + "px";
        copy2.style.left = position2 + "px";
    },
    function() {
        // replace orginal with copys that animate
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
        copy1.style.top = parseInt(copy1.style.top) + original1.offsetHeight + "px";
        copy2.style.top = parseInt(copy2.style.top) + -original2.offsetHeight + "px";
    },
    function() {
        // remove copies and reveal original with swapped values
        copy1.style.visibility = "hidden";
        copy2.style.visibility = "hidden";

        original1.style.visibility = "visible";
        original2.style.visibility = "visible";

        removeClass(copy1, 'search');
        removeClass(copy2, 'search');
    }], 1000);

};

function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
      setTimeout(functions[i], i*timeout);
    }
}


module.exports = BubbleSort;

},{}]},{},[1])
;