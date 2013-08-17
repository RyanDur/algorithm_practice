function MergeSort() {};

MergeSort.prototype.sort = function(collection) {
    if (collection.length <= 1) {
        return collection;
    }
    var mid = Math.floor(collection.length / 2);

    var left = this.split(collection, 0, mid);
    var right = this.split(collection, mid, collection.length);

    left = this.sort(left);
    right = this.sort(right);

    return this.merge(left, right);
};

MergeSort.prototype.merge = function(left, right) {
    var result = [];

    while(left.length > 0 || right.length > 0) {
        if(left.length > 0 && right.length > 0) {
            if(left[0] <= right[0]){
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        } else if(left.length > 0) {
            result.push(left.shift());
        } else if (right.length > 0) {
            result.push(right.shift());
        }
    }
    return result;
};

MergeSort.prototype.split = function(collection, start, finish) {
    var result = [];
    for(var i = start; i < finish; i++) {
        result.push(collection[i]);
    }
    return result;
};
