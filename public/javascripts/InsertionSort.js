function InsertionSort() {};

// (Insertion sort iterates, consuming one input element each repetition,
// and growing a sorted output list. Each iteration, insertion sort
// removes one element from the input data, finds the location it belongs
// within the sorted list, and inserts it there. It repeats until no
// input elements remain.) http://en.wikipedia.org/wiki/Insertion_sort)

InsertionSort.prototype.sort = function(collection) {
    for(var i = 1; i < collection.size(); i++) {
        var val = collection.get(i);
        var hole = i;

        while (hole > 0 && val < collection.get(hole-1)) {
            collection.set(hole, collection.get(hole-1));
            hole--;
        }

        collection.set(hole, val);
    }
    return collection;
};
