describe('SelectionSort', function() {

  describe('sort', function() {
    var ss, container, sortedContainer;

    beforeEach(function() {
      ss = new SelectionSort();
      container = new MyContainer([9,8,7,6,5,4,3,2,1,0]);
      sortedContainer = new MyContainer(10);
    });

    it('should return a sorted container', function() {
      expect(ss.sort(container)).toEqual(sortedContainer);
    });
  });
});
