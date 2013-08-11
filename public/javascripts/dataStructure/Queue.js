// bounded Queue
function Queue(size) {
  this.queue = new Array(size);
  this.upperBound = size;
  this.frontIndex = 0;
  this.rearIndex  = -1;
}

Queue.prototype.enqueue = function(value) {
  if(this.rearIndex+1 < this.upperBound) {
    this.rearIndex++;
    this.queue[this.rearIndex] = value;
  } else {
    throw new Error('The Queue is full');
  }
};

Queue.prototype.dequeue = function() {
  if(this.frontIndex <= this.rearIndex) {
    this.frontIndex++;
  } else {
    throw new Error('The Queue is empty');
  }
};

Queue.prototype.rear = function() {
  return this.queue[this.rearIndex];
};

Queue.prototype.front = function() {
  return this.queue[this.frontIndex];
};
