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

    swap(this.elem, elements[7], elements[8]);
};

var swap = function(elem, a, b) {
    appendChildTo(elem.getElementsByClassName('collection').item(0), 'li', 'swapA');
    appendChildTo(elem.getElementsByClassName('collection').item(0), 'li', 'swapB');

    var positionA = getPosition(a);
    var positionB = getPosition(b);
    var i = elem.getElementsByClassName('swapA').item(0);
    var j = elem.getElementsByClassName('swapB').item(0);
    i.innerHTML = a.innerHTML;
    j.innerHTML = b.innerHTML;
    var positionI = getPosition(i);
    var positionJ = getPosition(j);

    executeAsynchronously(
    [function() {
        // travel to swapping positions
        i.style.left = parseInt(positionA.x - positionI.x) + "px";
        j.style.left = parseInt(positionB.x - positionJ.x)+1 + "px";
    },
    function() {
        // replace orginal with copys that animate
        addClass(i, 'search');
        addClass(j, 'search');
        i.style.visibility = "visible";
        j.style.visibility = "visible";
        a.style.visibility = "hidden";
        b.style.visibility = "hidden";
    },
    function() {
        // take copies out of the row
        var temp = a.innerHTML;
        a.innerHTML = b.innerHTML;
        b.innerHTML = temp;
        i.style.top = -a.offsetHeight + "px";
        j.style.top = b.offsetHeight-1 + "px";
    },
    function() {
        // swap x positions
        i.style.left = (parseInt(i.style.left) + i.offsetWidth) + "px";
        j.style.left = (parseInt(j.style.left) - j.offsetWidth) + "px";
    },
    function() {
        // place copies back into the row
        i.style.top = parseInt(i.style.top) + a.offsetHeight + "px";
        j.style.top = parseInt(j.style.top) + -b.offsetHeight+1 + "px";
    },
    function() {
        // remove copies and reveal original with swapped values
        i.style.visibility = "hidden";
        j.style.visibility = "hidden";
        a.style.visibility = "visible";
        b.style.visibility = "visible";
        removeClass(i, 'search');
        removeClass(j, 'search');
    }
    ], 800);

};

var animate = function(func1, callback) {
    func1();
    callback();
}

function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
      setTimeout(functions[i], i*timeout);
    }
}


module.exports = BubbleSort;
