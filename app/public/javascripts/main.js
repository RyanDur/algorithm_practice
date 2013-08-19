var LinearSearch = require('./search/LinearSearch');
var ls = new LinearSearch([4,3,6,7,8,9,5,0,1,2]);
function repeatOften() {
  var demo = document.getElementById('demo');
  ls.insertInto(demo);
  ls.search(9);
  window.requestAnimationFrame(repeatOften);
};

$(function() {
  var demo = document.getElementById('demo');
  ls.insertInto(demo);
  ls.search(9);
  setInterval(function() {ls.search(9)}, 6000);
  //window.requestAnimationFrame(repeatOften);
});
