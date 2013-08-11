function InsertionSort() {};

// A sorting algorithm that keeps the contents on the left of the index
// sorted by inserting the value at the index into the proper position
// on the left.
//
// Visualize the container from left to right. Once sorted, the contents
// on the left will be less in value than the contents on the right.
//
// Starting at the second index, compare the value with the preceding
// values until it is greater than a before value or it is at the
// beginning. As the value progresses backwards through the container,
// move the greater values forward creating an open spot for the held
// value. Compare the held value to the value of the index before the
// open spot. Insert if it is greater, or there is no value before the
// open spot since it is the beginning. Repeat until the container is
// sorted.

InsertionSort.prototype.sort = function(collection) {
    // Iterate through collection starting at the second index.
    for(var i = 1; i < collection.size(); i++) {

        // Obtain the value at i.
        var val = collection.get(i);

        // Which leaves a hole in the collection.
        var hole = i;

        // If the value obtained at i is less than the value from the hole
        // minus one, move the value at hole minus one into the hole. Keep
        // moving the hole down the collection until the value obtained at
        // i is greater than hole minus one or the hole is at the
        // beginning of the collection.
        while (hole > 0 && val < collection.get(hole-1)) {
            collection.set(hole, collection.get(hole-1));
            hole--;
        }

        // Set the value retrieved at i into the hole.
        collection.set(hole, val);
    }
    return collection;
};
