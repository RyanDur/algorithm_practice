function BubbleSort(elem, collection) {
    this.elem = appendUnorderedList(elem, collection);
};

BubbleSort.prototype.sort = function() {
    var elements = this.elem.getElementsByTagName('li');
    var i = elements.length-2;
    var j = i;
    /*
     var time1 = setInterval(function() {
        var j = i;

        addClass(elements[j], 'search');
        addClass(elements[j+1], 'search');
        var time2 = setInterval(function() {
            if(i < 0 && j > elements.length-2) {
                clearInterval(time1);
                clearInterval(time2);
                return
            }
            if(j > elements.length-2) {
                clearInterval(time2);
                return;
            }
            if(elements[j].innerHTML > elements[j+1].innerHTML) {
                swap(elements, j, j+1);
            }
            j++;
            removeClass(elements[j-1], 'search');
            removeClass(elements[j], 'search');
            if(j+1 < elements.length) {
                addClass(elements[j+1], 'search');
            }

        }, 1000);
        i--;
    }, 3000);
    */

    animateSwap(this.elem, elements[0], elements[9]);
};

var animateSwap = function(elem, original1, original2) {
    // add copies to list
    var ul = elem.getElementsByClassName('collection').item(0);
    appendChildTo(ul, 'li', 'swapA');
    appendChildTo(ul, 'li', 'swapB');

    // get references to copies
    var copy1 = elem.getElementsByClassName('swapA').item(0);
    var copy2 = elem.getElementsByClassName('swapB').item(0);

    // place values into copies
    copy1.innerHTML = original1.innerHTML;
    copy2.innerHTML = original2.innerHTML;

    // get positions of the originals relative to the copies
    var position1 = parseInt(getPosition(original1).x) - parseInt(getPosition(copy1).x);
    var position2 = parseInt(getPosition(original2).x) - parseInt(getPosition(copy2).x);

    executeAsynchronously(
    [function() {
        // travel to swapping positions
        copy1.style.left = position1 + "px";
        copy2.style.left = position2 + "px";
    },
    function() {
        // replace orginal with copys that animate
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
        copy1.style.top = parseInt(copy1.style.top) + original1.offsetHeight + "px";
        copy2.style.top = parseInt(copy2.style.top) + -original2.offsetHeight + "px";
    },
    function() {
        // remove copies and reveal original with swapped values
        copy1.style.visibility = "hidden";
        copy2.style.visibility = "hidden";

        original1.style.visibility = "visible";
        original2.style.visibility = "visible";

        removeClass(copy1, 'search');
        removeClass(copy2, 'search');
    }], 1000);

};

function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
      setTimeout(functions[i], i*timeout);
    }
}


module.exports = BubbleSort;
