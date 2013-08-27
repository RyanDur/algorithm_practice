"use strict";

var Swapper = {
    element: function(element, className, original) {
      var elem = element.getElementsByClassName(className).item(0);
      elem.innerHTML = 0;

      return {
        elem: elem,
        original: original,
        moveIntoPosition: function(original) {
          elem.style.left = parseInt(getPosition(original).x) - parseInt(getPosition(elem).x) + "px"; 
        },
        moveUp: function() {
          elem.style.top = -original.offsetHeight + "px";
        },
        moveDown: function() {
          elem.style.top = original.offsetHeight + "px";
        },
        swap: function(otherElem) {
          var temp = parseInt(elem.style.left) - elem.offsetWidth + "px";
          elem.style.left = parseInt(otherElem.style.left) + otherElem.offsetWidth + "px";
          otherElem.style.left = temp;
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
    },

    steps: function(swapA, swapB) {

      return [
            function stepOne() {
              addSearch(swapA.original, swapB.original, swapA.elem, swapB.elem);

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
              swapA.swap(swapB.elem);
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
            }
      ];
    },

    move: function(elements, index) {
      var now = elements[index];
      var after = elements[index+1];

      return [
        function() {
          addSearch(now);
        },
        function() {
          removeSearch(now);
          addSearch(after);
        }]
    },

    addSearch: function(element) {
      return function() {
        addSearch(element);
      }
    },

    removeSearch: function(element) {
      return function() {
        removeSearch(element);
      }
    }
};

module.exports = Swapper;
