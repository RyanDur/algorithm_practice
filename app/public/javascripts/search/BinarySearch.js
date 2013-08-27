"use strict";

function BinarySearch(elem, collection) {
    var collection = collection;
    if(collection === undefined) {
        collection = [0,1,2,3,4,5,6,7,8,9];
    }
    this.elem = appendUnorderedList(elem, collection);
    this.elements = this.elem.getElementsByTagName('li');
};

BinarySearch.prototype.search = function(value) {
    var min = 0, max = this.elements.length-1, mid, range, queue = [];

    while(max >= min) {
        mid = Math.floor((min + max)/2);
        queue.push(search(this.elements[mid]));

        if(value > parseInt(this.elements[mid].innerHTML)) {
            min = mid+1;
            queue.push(ignore([0, min], this.elements, this.elements[mid]));
        } else if(value < parseInt(this.elements[mid].innerHTML)) {
            max = mid-1;
            queue.push(ignore([mid, this.elements.length], this.elements, this.elements[mid]));
        } else {
            queue.push(found(this.elements[mid]));
            return queue;
        }
    };

    return queue;
};

BinarySearch.prototype.cleanElements = function() {
    forEach(this.elements, function(el) {
        removeClass(el, 'found');
        removeClass(el, 'search');
        removeClass(el, 'ignore');
    });
};

var search = function(elem) {
    return function() {
        addClass(elem, 'search');
    }
};

var ignore = function(range, elements, elem) {
    return function() {
        removeClass(elem, 'search');
        for(var i = range[0]; i < range[1]; i++) {
            addClass(elements[i], 'ignore');
        }
    }
};

var found = function(elem) {
    return function() {
        addClass(elem, 'found');
    }
};

var clean = function(elements) {
};

module.exports = BinarySearch;
