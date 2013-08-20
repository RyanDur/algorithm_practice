function BinarySearch(collection) {
  this.collection = collection;
  this.elem;
};

BinarySearch.prototype.insertInto = function(elem) {
  appendChildTo(elem, 'ul', 'collection');
  var ul = elem.getElementsByClassName('collection').item(0);

  forEach(this.collection, function(value, index) {
    appendChildTo(ul, 'li', 'index'+ index);
    ul.lastElementChild.innerHTML = value;
  });

  this.elem = elem;
};

var t;

BinarySearch.prototype.search = function(value) {
  var min = 0, lastMid, range;
  var max = this.collection.length-1;
  var elements = this.elem.getElementsByTagName('li');
  clean(elements);

  var t = setInterval(function() {
    var mid = Math.floor((min + max)/2);
    if (max < min) {
      clearInterval(t);
      return;
    }
    if(range) {
      ignore(range, elements);
    }
    if(lastMid) {
      addClass(elements[lastMid], 'ignore');
      removeClass(elements[lastMid], 'search');
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
    removeClass(el, 'ignore');
    removeClass(el, 'found');
    removeClass(el, 'search');
  });
};

var ignore = function(range, elements) {
  for(var i = range[0]; i < range[1]; i++) {
    addClass(elements[i], 'ignore');
  }
};

module.exports = BinarySearch;
