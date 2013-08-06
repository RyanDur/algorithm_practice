function SelectionSort() {};

// ("The algorithm divides the input list into two parts: the sublist of items already sorted,
// which is built up from left to right at the front (left) of the list, and the sublist of
// items remaining to be sorted that occupy the rest of the list. Initially, the sorted
// sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds
// by finding the smallest (or largest, depending on sorting order) element in the unsorted
// sublist, exchanging it with the leftmost unsorted element (putting it in sorted order),
// and moving the sublist boundaries one element to the right.")
// http://en.wikipedia.org/wiki/Selection_sort)

SelectionSort.prototype.sort = function(container) {
  for(var i = 0; i < container.size()-1; i++) {
    var min = i;

    for(var j = i+1; j < container.size(); j++) {
      if(container.get(j) < container.get(min)) {
        min = j;
      }
    }

    if(min != i) {
      container.swap(i, min);
    }
  }
  return container;
};
