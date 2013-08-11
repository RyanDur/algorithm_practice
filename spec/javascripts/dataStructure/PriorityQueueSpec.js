//Array.prototype.join = (function(originalJoin) {
//  return function(separator) {
//    return originalJoin.call(this, separator===undefined?separator:'|');
//  }; 
//})(Array.prototype.join);

describe('PriorityQueue', function() {

  describe('enqueue', function() {
    it('should sort input values based on there priority', function() {
      pq = new PriorityQueue(10);

      pq.enqueue(7);
      expect(pq.front()).toEqual(7);
      expect(pq.rear()).toEqual(7);
      pq.enqueue(6);
      expect(pq.front()).toEqual(6)
      expect(pq.rear()).toEqual(7);
      pq.enqueue(5);
      expect(pq.front()).toEqual(5)
      expect(pq.rear()).toEqual(7);
    });
  });
});
