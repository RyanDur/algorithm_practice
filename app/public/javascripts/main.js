var LinearSearch = require('./search/LinearSearch');
var BinarySearch = require('./search/BinarySearch');
var DomCollection = require('./DomCollection');

var collection = [4,3,6,7,8,9,5,0,1,2];
var collection1 = [0,1,2,3,4,5,6,7,8,9];

var time = collection.length*1000;

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    var demo0 = document.getElementById('demo0');
    var ls = new LinearSearch(appendUnorderedList(demo0, collection));
    ls.search(Math.floor(Math.random() * 10));
    setInterval(function() {ls.search(Math.floor(Math.random() * 10));}, time);

    var demo1 = document.getElementById('demo1');
    var bs = new BinarySearch(appendUnorderedList(demo1, collection1));
    bs.search(Math.floor(Math.random() * 10));
    setInterval(function() {bs.search(Math.floor(Math.random() * 10));}, time);
  }
};