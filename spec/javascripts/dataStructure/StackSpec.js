describe('Stack', function() {

  describe('push', function(){
    it('should insert a value at the top of the container', function() {
      stack = new Stack(10);

      stack.push(3);

      expect(stack.peek()).toEqual(3);
    });

    it('should throw an error if push to full stack', function() {
      stack = new Stack(1);
      stack.push(1);

      expect(function(){stack.push(2)}).toThrow(new Error('Stack is full'));
    });
  });

  describe('pop', function() {
    it('should remove the top element of the collection', function() {
      stack = new Stack(2);
      stack.push(3);
      stack.push(6);

      stack.pop();
      expect(stack.peek()).toEqual(3);
    });

    it('should not pop an empty list', function() {
      stack = new Stack(1);

      expect(function() {stack.pop()}).toThrow(new Error('Stack is empty'));
    });
  });
});
