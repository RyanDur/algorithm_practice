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

    this.copy1 = elem.getElementsByClassName('swapA').item(0);
    this.copy2 = elem.getElementsByClassName('swapB').item(0);
    this.copy1OriginalPosition = getPosition(this.copy1);
    this.copy2OriginalPosition = getPosition(this.copy2);
};

BubbleSort.prototype.sort = function() {
    var queue = [];
    var elements = this.elements;

    if(this.demo) {
        shuffleInnerHTML(elements, this.length);
        this.collection = resetCollection(elements);
    }

    for(var j = this.length-2; j >= 0; j--) {
        for(var i = j; i < this.length - 1; i++) {
            if(this.collection[i] > this.collection[i+1]) {
                swap(this.collection, i, i+1);

                var item = animateSwap(this.elem, elements[i], elements[i+1]);
                queue.push(item);
            } else {
                var move = animateMove(elements, i);
                queue.push(move);
            }
            if(i+1 >= this.length-1) {
                queue.push(function(){
                    clean(elements);
                });
            }
        }
    }
    queue.push(resetCopy('swapA'));
    queue.push(resetCopy('swapB'));

    queue = flatten(queue);
    executeAsynchronously(queue, 600);
};

var resetCopy = function(copy) {
    return [function() {
        document.getElementsByClassName(copy).item(0).style.left = 0
    }];
};

var animateMove = function(elements, index) {
    var before = elements[index-1];
    var now = elements[index];
    var after = elements[index+1]
        return [function() {
            addClass(now, 'search');
            addClass(after, 'search');
        },
        function() {
            removeClass(before, 'search');
            addClass(after, 'search');
        }];
};

var clean = function(elements) {
    for(var i = 0; i < elements.length; i++) {
        removeClass(elements[i], 'search');
    }
};

var animateSwap = function(elem, original1, original2) {

    // get references to copies
    var copy1 = elem.getElementsByClassName('swapA').item(0);
    var copy2 = elem.getElementsByClassName('swapB').item(0);

    copy1.innerHTML = 0;
    copy2.innerHTML = 0;

    // get positions of the originals relative to the copies
    var position1 = parseInt(getPosition(original1).x) - parseInt(getPosition(copy1).x);
    var position2 = parseInt(getPosition(original2).x) - parseInt(getPosition(copy2).x);

    return [function() {
               // travel to swapping positions
               copy1.style.left = position1 + "px";
               copy2.style.left = position2 + "px";

               // place values into copies
               copyInnerHTML(copy1, original1);
               copyInnerHTML(copy2, original2);
           },
           function() {
               // replace orginal with copies that animate
               addClass(copy1, 'search');
               addClass(copy2, 'search');

               copy1.style.visibility = "visible";
               copy2.style.visibility = "visible";

               original1.style.visibility = "hidden";
               original2.style.visibility = "hidden";
           },
           function() {
               // take copies out of the row and swap original
               swapInnerHTML(original1, original2);
               addClass(original2, 'search');
               removeClass(original1, 'search');

               copy1.style.top = -original1.offsetHeight + "px";
               copy2.style.top = original2.offsetHeight + "px";
           },
           function() {
               // swap x positions
               copy1.style.left = position2 + copy1.offsetWidth + "px";
               copy2.style.left = position1 - copy2.offsetWidth + "px";
           },
           function() {
               // place copies back into the row
               copy1.style.top = 0;
               copy2.style.top = 0;
           },
           function() {
               // remove copies and reveal original with swapped values

               copy1.style.visibility = "hidden";
               copy2.style.visibility = "hidden";

               original1.style.visibility = "visible";
               original2.style.visibility = "visible";

               removeClass(copy1, 'search');
               removeClass(copy2, 'search');
           }];
};

var executeAsynchronously = function(functions, timeout) {
    for(var i = 0; i < functions.length; i++) {
        var time = setTimeout(functions[i], i*timeout);
    }
};

module.exports = BubbleSort;
