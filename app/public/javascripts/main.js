"use strict";

var LinearSearch = require('./search/LinearSearch');
var BinarySearch = require('./search/BinarySearch');

var time = 10000;

document.onreadystatechange = function() {
  console.log(document.readyState);
  if (document.readyState === 'complete') {
    var demo0 = document.getElementById('demo0');
    var ls = new LinearSearch(demo0);
    ls.search(Math.floor(Math.random() * 10));
    setInterval(function() {ls.search(Math.floor(Math.random() * 10));}, time);

    var demo1 = document.getElementById('demo1');
    var bs = new BinarySearch(demo1);
    bs.search(Math.floor(Math.random() * 10));
    setInterval(function() {bs.search(Math.floor(Math.random() * 10));}, time);
  }
};
