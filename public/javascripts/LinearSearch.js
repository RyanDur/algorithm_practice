function LinearSearch() {};

// (...a method for finding a particular value in a list,
// that consists of checking every one of its elements,
// one at a time and in sequence, until the desired one
// is found.) http://en.wikipedia.org/wiki/Linear_search)

LinearSearch.prototype.search = function(collection, num) {
    for(var i = 0; i < collection.size(); i++) {
        if(num === collection.get(i)) {
            return i;
        }
    }
};
