function LinearSearch() {};

// (...a method for finding a particular value in a list,
// that consists of checking every one of its elements,
// one at a time and in sequence, until the desired one
// is found.) http://en.wikipedia.org/wiki/Linear_search)
//
// The algorithm searches through a list sequentially for
// a provided value
//
// Visualize the container from left to right.
//
// Search from the beginning of a collection to the end
// or until the value is found and return the index.

LinearSearch.prototype.search = function(collection, num) {

  // Iterate from the beginning of the container
  for(var i = 0; i < collection.size(); i++) {

    // If the value is in the the collection
    if(num === collection.get(i)) {

      // return the index.
      return i;
    }
  }
};
