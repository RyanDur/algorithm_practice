"use strict";
var swapper;

function BubbleSort(elem, collection) {
    if(collection === undefined) {
        collection = [9,8,7,6,5,4,3,2,1,0];
    }

    this.elem = appendUnorderedList(elem, collection);
    this.elements = this.elem.getElementsByTagName('li');
    this.collection = collection;
    this.length = collection.length;

    var ul = this.elem.getElementsByClassName('collection').item(0);
    forEach(['swapA', 'swapB'], function(swap) {
        appendChildTo(ul, 'li', swap);
    });
};

var element = function(elem) {
    return {
        getClass: function(className){
            return elem.getElementsByClassName(className).item(0);
        }
    }
};

BubbleSort.prototype.sort = function() {
    var queue = [], elements = this.elements, swapA, swapB;
    var elem = element(this.elem);
    var elemA = elem.getClass('swapA');
    var elemB = elem.getClass('swapB');

    addClassToCollection(elements, 'ignore', this.length);
    queue.push(removeIgnore(elements[this.length-1]));

    for(var j = this.length-2; j >= 0; j--) {
        for(var i = j; i < this.length-1; i++) {
            if(i === j) {
                queue.push(removeIgnore(elements[i]));
            }
            if(this.collection[i] > this.collection[i+1]) {
                swap(this.collection, i, i+1);
                swapA = swapElement(elemA, elements[i]);
                swapB = swapElement(elemB, elements[i+1]);
                queue.push(steps(swapA, swapB));
            } else {
                queue.push(move(elements, i));
            }
            if(i+1 >= this.length-1) {
                queue.push(removeSearch(elements[i], elements[i+1]));
            }
        }
    }

    if(swapA != undefined) {
        queue.push([swapA.reset, swapB.reset]);
    }
    return flatten(queue);
};

BubbleSort.prototype.reset = function() {
    shuffleInnerHTML(this.elements, this.length);
    this.collection = resetCollection(this.elements);
};

module.exports = BubbleSort;
