"use strict";
var swapper = require('../SwapElement');

function BubbleSort(elem, collection) {
    this.demo = false;

    if(collection === undefined) {
        this.demo = true;
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

BubbleSort.prototype.sort = function() {
    var queue = [], elements = this.elements, swapA, swapB;

    addClassToCollection(elements, 'ignore', this.length);
    queue.push(removeIgnore(elements[this.length-1]));

    if(this.demo) {
        shuffleInnerHTML(elements, this.length);
        this.collection = resetCollection(elements);
    }

    for(var j = this.length-2; j >= 0; j--) {
        for(var i = j; i < this.length - 1; i++) {
            if(i === j) {
                queue.push(removeIgnore(elements[i]));
            }
            if(this.collection[i] > this.collection[i+1]) {
                swap(this.collection, i, i+1);
                swapA = swapper.element(this.elem, 'swapA', elements[i]);
                swapB = swapper.element(this.elem, 'swapB', elements[i+1]);
                queue.push(swapper.steps(swapA, swapB));
            } else {
                queue.push(swapper.move(elements, i));
            }
            if(i+1 >= this.length-1) {
                queue.push(clean(elements, this.length));
            }
        }
    }

    queue.push([swapA.reset, swapB.reset]);
    queue = flatten(queue);
    executeAsynchronously(queue, 500);
};

module.exports = BubbleSort;
