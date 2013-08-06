describe('BinarySearch', function() {

  describe('search', function() {
    beforeEach(function() {
      bs = new BinarySearch();
      container = new MyContainer(100);
    });

    it('should return a sorted container', function() {
      expect(bs.search(container, 5)).toEqual(5);
      expect(bs.search(container, 50)).toEqual(50);
      expect(bs.search(container, 67)).toEqual(67);
      expect(bs.search(container, 0)).toEqual(0);
      expect(bs.search(container, 1)).toEqual(1);
      expect(bs.search(container, 99)).toEqual(99);
    });
  });
});
