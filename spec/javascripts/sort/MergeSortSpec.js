describe('MergeSort', function() {

  describe('sort', function() {
    it('should sort a collection', function() {
      var ms = new MergeSort();

      expect(ms.sort([9,8,7,6,5,4,3,2,1,0])).toEqual([0,1,2,3,4,5,6,7,8,9]);
      expect(ms.sort([5,4,3,2,1])).toEqual([1,2,3,4,5]);
      expect(ms.sort([78,34,2,5,87,0])).toEqual([0,2,5,34,78,87]);
    });
  });
});
