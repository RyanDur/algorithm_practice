function LinearSearch(collection) {
  this.collection = collection;
  this.elem;
};

module.exports = LinearSearch;

LinearSearch.prototype.insertInto = function(elem) {
  appendChildTo(elem, 'ul', 'collection');
  var ul = elem.getElementsByClassName('collection').item(0);

  forEach(this.collection, function(value, index) {
    appendChildTo(ul, 'li', 'index'+ index);
    ul.lastElementChild.innerHTML = value;
  });

  this.elem = elem;
};

LinearSearch.prototype.search = function(value) {
  var list = this.elem.getElementsByTagName('li');
  forEach(list, function(li) {
    removeClass(li, 'search');
    removeClass(li, 'found');
  });

  forEach(list, function(li, index) {
    var t = setTimeout(function() { 
      if(index > 0) {
        removeClass(list[index-1], 'search');
      }

      addClass(li, 'search');

      if (li.innerHTML == value) {
        addClass(li, 'found');
        clearTimeout(t);
      }
    }, index*800);

    if (li.innerHTML == value) {
      return false;
    }
  });
};
