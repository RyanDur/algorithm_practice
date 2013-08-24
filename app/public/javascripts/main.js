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
