function SelectionSort() {};

// An algorithim to sort a collection by swapping the values that are
// smaller with the larger.
//
// Visualize the container from left to right. Once sorted, the contents
// on the left will be less in value than the contents on the right.
//
// From the beginning of the collection, keep the left hand side of the
// collection sorted by finding the smallest values in sequential order
// and swapping them with the index.

SelectionSort.prototype.sort = function(container) {
  // From the beginning to second to last
  for(var i = 0; i < container.size()-1; i++) {
    // label the index as the minimum
    var min = i;

    // from one past the index
    for(var j = i+1; j < container.size(); j++) {

      // find the smallest value in the collection
      // if the value at the inner index is smaller than
      // the minimum
      if(container.get(j) < container.get(min)) {
        // set the new minimum index
        min = j;
      }
    }

    // as long as the minimum is not the index the pointer is at
    if(min != i) {

      // swap the values
      container.swap(i, min);
    }
  }
};
