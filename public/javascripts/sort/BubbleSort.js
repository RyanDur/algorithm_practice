function BubbleSort() {}

// A sorting algorithm that compares adjacent indices and
// continually swaps the contents if they are not in sequence.
//
// Visualize the container from left to right. Once sorted,
// the contents on the left will be less in value than the
// contents on the right.
//
// Start at the right most position of the container. If the
// last two positions are out-of-order, swap the contents.
// Then move the position to the left one comparing and
// swapping the contents of those two adjacent indices, and
// then compare the original two positions and swap them if
// they are out-of-order. Continue moving from right to left
// in the outer loop, while moving left to right in the inner
// loop comparing and swapping the contents that are
// out-of-order. The larger values will then bubble up to the
// top of the list until the contents are sorted.

BubbleSort.prototype.sort = function(container) {
    // count backwrads from the second to last index position
    // because we start by comparing the the last two positions
    for(var i = container.size() - 2; i >= 0; i--) {

        // start from the outer loops index, moving to the
        // end of the container
        for(var j = i; j < container.size() - 1; j++) {

            // if the contents at the index are greater than the
            // contents at the index plus one
            if(container.get(j) > container.get(j+1)) {

                // swap the contents of the two indices
                container.swap(j, j+1);
            }
        }
    }
    return container;
};
