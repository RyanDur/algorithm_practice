var LinearSearch = require('./search/LinearSearch');
var BinarySearch = require('./search/BinarySearch');

var collection = [4,3,6,7,8,9,5,0,1,2];
var sortedCollection = [0,1,2,3,4,5,6,7,8,9];

var time = collection.length*1000;
var ls = new LinearSearch(collection);
var bs = new BinarySearch(sortedCollection);

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {

    var demo0 = document.getElementById('demo0');
    ls.insertInto(demo0);
    ls.search(Math.floor(Math.random() * 10));
    setInterval(function() {ls.search(Math.floor(Math.random() * 10))}, time);

    var demo1 = document.getElementById('demo1');
    bs.insertInto(demo1);
    bs.search(6);
    setInterval(function() {bs.search(6);}, time);
  }
};
