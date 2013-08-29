"use strict";

var forEach = function(collection, func) {
  for(var i = 0; i < collection.length; i++) {
    var val = func(collection[i], i);
    if(val !== undefined) {
      return;
    }
  }
};

var find = function(name) {
  return new RegExp('(\\s|^  )'+name+'(\\s|$)');
};

var hasClass = function(el, name) {
  return new RegExp('(\\s|^ )'+name+'(\\s|$)').test(el.className);
};

var addClass = function(el, name) {
  if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
};

var removeClass = function(el, name) {
  if (hasClass(el, name)) {
    el.className=el.className.replace(new RegExp('(\\s|^ )'+name+'(\\s|$)' ),' ').replace(/^\s+|\s+$/g, '');
  }
};

var appendChildTo = function(elem, tag, className) {
  var node = document.createElement(tag);
  addClass(node, className);
  elem.appendChild(node);
};

var appendUnorderedList = function(elem, collection, className) {
  appendChildTo(elem, 'ul', 'collection');
  var ul = elem.getElementsByClassName('collection').item(0);

  forEach(collection, function(value, index) {
    appendChildTo(ul, 'li', 'index'+ index);
    ul.lastElementChild.innerHTML = value;
  });

  return elem;
};

var addClassToCollection = function(elements, className, length) {
  for(var i = 0; i < length; i++) {
    addClass(elements[i], className);
  }
}

var getPosition = function(element) {
  var xPosition = (element.offsetLeft - element.scrollLeft + element.clientLeft);
  var yPosition = (element.offsetTop - element.scrollTop + element.clientTop);
  return { x: xPosition, y: yPosition  };
};

var swapInnerHTML = function(a, b) {
  var temp = a.innerHTML;
  a.innerHTML = b.innerHTML;
  b.innerHTML = temp;
};

var swap = function(collection, a, b) {
  var temp = collection[a];
  collection[a] = collection[b];
  collection[b] = temp;
};

var flatten = function(array) {
  var flat = [];
  for (var i = 0, l = array.length; i < l; i++){
    var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
    if (type) {
      flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]);
    }
  }
  return flat;
};

var shuffleInnerHTML = function(o, length) {
  for(var j, x, i = length; i; j = parseInt(Math.random() * i), x = o[--i].innerHTML, o[i].innerHTML = o[j].innerHTML, o[j].innerHTML = x);
};

var resetCollection = function(elements) {
  var collection = [];
  for(var i = 0; i < elements.length; i++) {
    collection.push(elements[i].innerHTML);
  }
  return collection;
}

var addSearch = function() {
  var array = arguments;
  return function() {
    forEach(array, function(elem) {
      addClass(elem, 'search');
    });
  }
};

var hide = function() {
  forEach(arguments, function(elem) {
    elem.style.visibility = "hidden";
  });
};

var makeVisible = function() {
  forEach(arguments, function(elem) {
    elem.style.visibility = "visible";
  });
};

var removeIgnore = function() {
  var elements = arguments;
  return function() {
    forEach(elements, function(element) {
      removeClass(element, 'ignore');
    });
  };
};

var removeSearch = function() {
  var array = arguments;
  return function() {
    forEach(array, function(elem) {
      removeClass(elem, 'search');
    });
  };
};

var executeAsynchronously = function(functions, timeout) {
  forEach(functions, function(func, index) {
    setTimeout(func, index*timeout);
  });
};

var found = function(elem) {
  return function() {
    addClass(elem, 'found');
  }
};

var swapElement = function(elem, original) {
  elem.innerHTML = 0;
  var position = parseInt(getPosition(original).x) - parseInt(getPosition(elem).x);

  return {
    elem: elem,
    original: original,
    copyElement: function() {
      elem.innerHTML = original.innerHTML;
      elem.style.left = position + "px"; 
    },
    moveUp: function() {
      elem.style.top = -elem.offsetHeight + "px";
    },
    moveDown: function() {
      elem.style.top = elem.offsetHeight + "px";
    },
    swap: function(otherElem) {
      var temp = parseInt(elem.style.left) - elem.offsetWidth + "px";
      elem.style.left = parseInt(otherElem.elem.style.left) + otherElem.elem.offsetWidth + "px";
      otherElem.elem.style.left = temp;

      var temp1 = otherElem.original.innerHTML;
      otherElem.original.innerHTML = original.innerHTML;
      original.innerHTML = temp1;
    },
    putBackInLine: function() {
      elem.style.top = 0;
    },
    reset: function() {
      elem.style.left = 0;
    }
  }
};

var steps = function(swapA, swapB) {
  var swapElements = function(func) {
    forEach([swapA, swapB], function(swap) {
      swap[func]();
    });
  };

  return [
    function stepOne() {
      swapElements('copyElement');
    },
    function stepTwo() {
      hide(swapA.original, swapB.original);
      makeVisible(swapA.elem, swapB.elem);
    },
    function stepThree() {
      swapA.moveUp();
      swapB.moveDown();
    },
    function stepFour() {
      swapA.swap(swapB);
    },
    function stepFive() {
      swapElements('putBackInLine');
    },
    function stepSix() {
      hide(swapA.elem, swapB.elem);
      makeVisible(swapA.original, swapB.original);
    }
  ];
};

var move = function(elements, index, length) {
  var before = elements[index-1], now = elements[index], after = elements[index+1];
  var moveQueue = [
    function() {
      if(index-1 >= 0) {
        removeSearch(before)();
      }
      addSearch(now,after)();
    }
  ];

  if(index+1 >= length-1) {
    moveQueue.push(removeSearch(now,after));
  }

  return moveQueue;
};
