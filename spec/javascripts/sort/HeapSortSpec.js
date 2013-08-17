describe('HeapSort', function() {

  describe('sort', function() {
    var hs = new HeapSort();

    expect(hs.sort([9,8,7,6,5,4,3,2,1,0])).toEqual([0,1,2,3,4,5,6,7,8,9]);
    expect(hs.sort([34,234,15,67,2])).toEqual([2,15,34,67,234]);
    expect(hs.sort([4,3,5,2,6,1])).toEqual([1,2,3,4,5,6]);
  })
});
