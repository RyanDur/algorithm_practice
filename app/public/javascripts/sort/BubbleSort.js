"use strict";

function BubbleSort(elem, collection) {
    this.demo = false;

    if(collection === undefined) {
        this.demo = true;
        collection =  [9,8,7,6,5,4,3,2,1,0];
    }

    this.elem = appendUnorderedList(elem, collection);
    this.elements = this.elem.getElementsByTagName('li');
    this.collection = collection;
    this.length = collection.length;

    var ul = this.elem.getElementsByClassName('collection').item(0);
    appendChildTo(ul, 'li', 'swapA');
    appendChildTo(ul, 'li', 'swapB');
};

BubbleSort.prototype.sort = function() {
    var queue = [], elements = this.elements, swapA, swapB;

    addClassToCollection(elements, 'ignore', this.length);

    if(this.demo) {
        shuffleInnerHTML(elements, this.length);
        this.collection = resetCollection(elements);
    }

    queue.push(removeIgnore(elements[this.length-1]));

    for(var j = this.length-2; j >= 0; j--) {
        for(var i = j; i < this.length - 1; i++) {
            if(i === j ) {
                queue.push(removeIgnore(elements[i]));
            }
            if(this.collection[i] > this.collection[i+1]) {
                swap(this.collection, i, i+1);
                swapA = swapElement(this.elem, 'swapA', elements[i]);
                swapB = swapElement(this.elem, 'swapB', elements[i+1]);
                queue.push(swapSteps(swapA, swapB));
            } else {
                queue.push(moveSteps(elements, i));
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

var moveSteps = function(elements, index) {
    var now = elements[index];
    var after = elements[index+1];
    if(index-1 > 0) {
        var before = elements[index-1];
    }

    return function() {
        addSearch(now, after);
        if(before) {
            removeSearch(before);
        }
    };
};

var swapSteps = function(swapA, swapB) {

    return [function stepOne() {
               addSearch(swapA.original, swapB.original, swapA.elem, swapB.elem);
               forEach([swapA, swapB], function(swap) {
                swap.moveIntoPosition();
               })

               forEach([swapA, swapB], function(swap) {
                swap.copyInnerHTML();
               });
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
               swapInnerHTML(swapA.original, swapB.original);
               swapA.moveRight();
               swapB.moveLeft();
           },
           function stepFive() {
               addSearch(swapB.original);
               removeSearch(swapA.original);

               forEach([swapA, swapB], function(swap) {
                swap.putBackInLine();
               });
           },
           function stepSix() {
               removeSearch(swapA.elem, swapB.elem);
               hide(swapA.elem, swapB.elem);
               makeVisible(swapA.original, swapB.original);
           }];
};

var swapElement = function(element, className, original) {
    var elem = element.getElementsByClassName(className).item(0);
    elem.innerHTML = 0;
    var position = parseInt(getPosition(original).x) - parseInt(getPosition(elem).x);

    return {
        elem: elem,
        original: original,
        moveIntoPosition: function() {
            elem.style.left = position + "px"; 
        },
        moveUp: function() {
            elem.style.top = -original.offsetHeight + "px";
        },
        moveDown: function() {
            elem.style.top = original.offsetHeight + "px";
        },
        moveLeft: function() {
            elem.style.left = position - elem.offsetWidth + "px";
        },
        moveRight: function() {
            elem.style.left = position + elem.offsetWidth + "px";
        },
        putBackInLine: function() {
            elem.style.top = 0;
        },
        copyInnerHTML: function() {
            elem.innerHTML = original.innerHTML;
        },
        reset: function() {
            elem.style.left = 0;
        }
    }
};

var executeAsynchronously = function(functions, timeout) {
    forEach(functions, function(func, index) {
        setTimeout(func, index*timeout);
    });
};

var addSearch = function() {
    forEach(arguments, function(elem) {
        addClass(elem, 'search');
    });
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

var removeSearch = function() {
    forEach(arguments, function(elem) {
        removeClass(elem, 'search');
    });
};

var removeIgnore = function() {
    var array = arguments;
    return function() {
        forEach(array, function(elem) {
            removeClass(elem, 'ignore');
        });
    };
};

var clean = function(elements, length) {
    return function() {
        for(var i = 0; i < length; i++) {
            removeSearch(elements[i]);
        }
    };
};

module.exports = BubbleSort;
