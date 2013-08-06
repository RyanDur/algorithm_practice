describe('BubbleSort', function() {

  describe('sort', function() {
    var bs, container, sortedContainer;

    beforeEach(function() {
      bs = new BubbleSort();
      container = new MyContainer([5,4,3,2,1]);
      sortedContainer = new MyContainer([1,2,3,4,5]);
    });

    it('should return a sorted container', function() {
      expect(bs.sort(container)).toEqual(sortedContainer);

      container = new MyContainer([3,2,4,1,5]);
      expect(bs.sort(container)).toEqual(sortedContainer);
    });
  });
});
