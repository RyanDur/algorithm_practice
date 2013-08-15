describe('Heap', function() {

  xit('should take a value', function() {
    heap = new Heap();
    heap.inser(5);

    expect(heap.front()).toEqual(5);
  });
});
