// bounded Stack
function Stack(size) {
  this.upperBound = size-1;
  this.lowerBound = -1;
  this.stack = new Array(size);
  this.top = -1;
}

Stack.prototype.push = function(value) {
  if(this.top < this.upperBound) {
    this.top++;
    this.stack[this.top] = value;
  } else {
    throw new Error('Stack is full');
  }
};

Stack.prototype.pop = function() {
  if(this.top > this.lowerBound) {
    this.stack[top] = null;
    this.top--;
  } else {
    throw new Error('Stack is empty');
  }
};

Stack.prototype.peek = function() {
  return this.stack[this.top];
};
