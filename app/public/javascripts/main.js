var LinearSearch = require('./search/LinearSearch');

$(function() {
  var ls = new LinearSearch([4,3,6,7,8,9,5,0,1,2]);

  var demo = document.getElementById('demo');
  ls.insertInto(demo);
  ls.search(9);
});
