function HeapSort() {
  this.heap = []
};

HeapSort.prototype.sort = function(collection) {
  this.heap = collection;
  this.heapify();
  this.toSequence();
  return this.heap;
};

HeapSort.prototype.heapify = function() {
  var length = this.heap.length-1;

  for(var start = Math.floor((length-1)/2); start >= 0; start--) {
    this.sortDown(start, length);
  }
};

HeapSort.prototype.toSequence = function() {
  for(var last = this.heap.length-1; last > 0; last--) {
    this.swap(0, last);
    this.sortDown(0, last-1);
  }
};

HeapSort.prototype.swap = function(a, b) {
  var temp = this.heap[a];
  this.heap[a] = this.heap[b];
  this.heap[b] = temp;
};

HeapSort.prototype.sortDown = function(root, heapEnd) {
  while(2*root+1 <= heapEnd) {
    var leftChild = 2*root+1;
    var rightChild = leftChild+1;

    if(rightChild <= heapEnd &&
      this.heap[leftChild] < this.heap[rightChild] &&
      this.heap[root] < this.heap[rightChild]) {

      this.swap(root, rightChild);
      root = rightChild;

    } else if(this.heap[root] < this.heap[leftChild]) {

      this.swap(root, leftChild);
      root = leftChild;

    } else {
      return;
    }
  }
};
