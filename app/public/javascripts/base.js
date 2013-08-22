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

    swap(this.elem, elements[7], elements[8]);
};

var swap = function(elem, a, b) {
    appendChildTo(elem.getElementsByClassName('collection').item(0), 'li', 'swapA');
    appendChildTo(elem.getElementsByClassName('collection').item(0), 'li', 'swapB');

    var i = elem.getElementsByClassName('swapA').item(0);
    var j = elem.getElementsByClassName('swapB').item(0);
    i.innerHTML = a.innerHTML;
    j.innerHTML = b.innerHTML;
    var pA = parseInt(getPosition(a).x);
    var pB = parseInt(getPosition(b).x);
    var pI = pA - parseInt(getPosition(i).x);
    var pJ = pB - parseInt(getPosition(j).x);

    executeAsynchronously(
    [function() {
        // travel to swapping positions
        i.style.left = pI + "px";
        j.style.left = pJ + 1 + "px";
    },
    function() {
        // replace orginal with copys that animate
        addClass(i, 'search');
        addClass(j, 'search');
        i.style.visibility = "visible";
        j.style.visibility = "visible";
        a.style.visibility = "hidden";
        b.style.visibility = "hidden";
    },
    function() {
        // take copies out of the row
        var temp = a.innerHTML;
        a.innerHTML = b.innerHTML;
        b.innerHTML = temp;
        i.style.top = -a.offsetHeight + "px";
        j.style.top = b.offsetHeight-1 + "px";
    },
    function() {
        // swap x positions
        i.style.left = pJ + 1 + i.offsetWidth + "px";
        j.style.left = pI - j.offsetWidth + "px";
    },
    function() {
        // place copies back into the row
        i.style.top = parseInt(i.style.top) + a.offsetHeight + "px";
        j.style.top = parseInt(j.style.top) + -b.offsetHeight+1 + "px";
    },
    function() {
        // remove copies and reveal original with swapped values
        i.style.visibility = "hidden";
        j.style.visibility = "hidden";
        a.style.visibility = "visible";
        b.style.visibility = "visible";
        removeClass(i, 'search');
        removeClass(j, 'search');
    }
    ], 800);

};

var animate = function(func1, callback) {
    func1();
    callback();
}

function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
      setTimeout(functions[i], i*timeout);
    }
}


module.exports = BubbleSort;

},{}]},{},[1])
;