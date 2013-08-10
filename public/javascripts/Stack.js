function Stack(size) {
  this.upperBound = size;
  this.lowerBound = 0;
  this.stack = new Array(size);
  this.top = -1;
}

Stack.prototype.push = function(value) {
  if(!this.isFull()) {
    this.top++;
    this.stack[this.top] = value;
  } else {
    throw new Error('Stack is full');
  }
};

Stack.prototype.pop = function() {
  if(!this.isEmpty()) {
    this.stack[top] = null;
    this.top--;
  } else {
    throw new Error('Stack is empty');
  }
};

Stack.prototype.peek = function() {
  return this.stack[this.top];
};

Stack.prototype.isFull = function() {
  return this.top+1 > this.upperBound-1;
};

Stack.prototype.isEmpty = function() {
  return this.top < 0;
};
