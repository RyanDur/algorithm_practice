function MyContainer(val) {
    if (val instanceof Array) {
        this.container = val;
    } else {
        this.container = new Array(val);
        for(var i = 0; i < this.container.length; i++) {
            this.container[i] = i
        }
    }
}

MyContainer.prototype.size = function() {
    return this.container.length;
};

MyContainer.prototype.get = function(index) {
    return this.container[index];
};

MyContainer.prototype.set = function(index, val) {
    this.container[index] = val;
};
