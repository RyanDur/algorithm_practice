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

    executeAsynchronously(bsort.sort(), 500);
    setInterval(function() {
      bsort.reset();
      executeAsynchronously(bsort.sort(), 500);
    }, 150000);

    /*
    ss.sort();
  */
  }
};
