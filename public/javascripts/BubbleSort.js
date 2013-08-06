function BubbleSort() {}

// (...a simple sorting algorithm that works by repeatedly stepping through the list to be sorted,
// comparing each pair of adjacent items and swapping them if they are in the wrong order. The
// pass through the list is repeated until no swaps are needed, which indicates that the list
// is sorted.) http://en.wikipedia.org/wiki/Bubble_sort

BubbleSort.prototype.sort = function(container) {
    for(var i = container.size() - 2; i >= 0; i--) {
        for(var j = i; j < container.size(); j++) {
            if(container.get(j) > container.get(j+1)) {
                container.swap(j, j+1);
            }
        }
    }
    return container;
};
