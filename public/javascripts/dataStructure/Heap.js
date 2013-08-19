function Heap() {
  this.heap = [];
};

Heap.prototype.insert = function(value) {
  this.heap.push(value);
  this.sortUp();
  console.log("hello");
};

Heap.prototype.front = function() {
  return this.heap[0];
};

Heap.prototype.deleteFront = function() {
  this.swap(0, this.heap.length-1);
  this.heap.pop();
  this.sortDown();
};

Heap.prototype.swap = function(a,b) {
  var temp = this.heap[a];
  this.heap[a] = this.heap[b];
  this.heap[b] = temp;
};

Heap.prototype.sortUp = function() {
  var heapChild = this.heap.length-1;
  var heapParent = Math.floor((heapChild - 1)/2);

  while(heapParent >= 0 &&
    this.heap[heapChild] > this.heap[heapParent]) {

    this.swap(heapChild, heapParent);
    heapChild = heapParent;
    heapParent = Math.floor((heapChild - 1)/2);
  }
};

Heap.prototype.sortDown = function() {
  var heapParent = 0;

  while(heapParent < this.heap.length) {
    var leftChild = 2*heapParent+1;
    var rightChild = leftChild+1;

    if(this.heap[rightChild] !== undefined &&
      this.heap[leftChild] < this.heap[rightChild] &&
      this.heap[heapParent] < this.heap[rightChild]) {

      this.swap(rightChild, heapParent);
      heapParent = rightChild;
    } else if(this.heap[leftChild] !== undefined &&
      this.heap[heapParent] < this.heap[leftChild]) {

      this.swap(heapParent, leftChild);
      heapParent = leftChild;
    } else {
      return;
    }
  }
};
