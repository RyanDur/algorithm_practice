describe('Queue', function() {

  describe('enqueue', function() {
    it('should put the value at the end of the collection', function(){
      queue = new Queue(10);

      queue.enqueue(3);
      expect(queue.rear()).toEqual(3);

      queue.enqueue(10)
      expect(queue.rear()).toEqual(10);
    });

    it('should raise an error if the queue is full', function() {
      queue = new Queue(1);
      queue.enqueue(1);

      expect(function() {queue.enqueue(1)}).toThrow(new Error('The Queue is full'));
    });
  });

  describe('dequeue', function() {
    it('should remove the front of the collection', function() {
      queue = new Queue(10);
      queue.enqueue(2);
      queue.enqueue(7);
      queue.enqueue(0);

      expect(queue.front()).toEqual(2);
      queue.dequeue();
      expect(queue.front()).toEqual(7);
      queue.dequeue();
      expect(queue.front()).toEqual(0);
    });

    it('should raise an error if dequeuing an empty queue', function() {
      queue = new Queue(1);

      expect(function() {queue.dequeue()}).toThrow(new Error('The Queue is empty'));

      queue = new Queue(2);
      queue.enqueue(1);
      queue.enqueue(1);
      queue.dequeue()
      queue.dequeue()

      expect(function() {queue.dequeue()}).toThrow(new Error('The Queue is empty'));
    });
  });
});
