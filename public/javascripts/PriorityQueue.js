PriorityQueue.prototype = new Queue();
PriorityQueue.prototype.constructor = PriorityQueue;
PriorityQueue.prototype.parent = Queue.prototype;

function PriorityQueue(size) {
  this.parent.constructor.call(this, size);
}

PriorityQueue.prototype.enqueue = function(value) {
  this.parent.enqueue.call(this, value);
  this.sort();
};

PriorityQueue.prototype.sort = function() {
  for(var i = this.frontIndex+1; i <= this.rearIndex; i++) {
    var value = this.queue[i];
    var hole = i;

    while(hole > this.frontIndex && value < this.queue[hole-1]) {
      this.queue[hole] = this.queue[hole-1];
      hole--;
    }

    this.queue[hole] = value;
  }
};
