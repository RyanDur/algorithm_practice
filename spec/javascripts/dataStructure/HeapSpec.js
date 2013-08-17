describe('Heap', function() {

  xit('should insert a value and put the max value on the top', function() {
    heap = new Heap();

    heap.insert(5);
    expect(heap.front()).toEqual(5);

    heap.insert(4);
    expect(heap.front()).toEqual(5);

    heap.insert(10);
    expect(heap.front()).toEqual(10);
  });

  it('should delete the top value and replace it with the bottom then sort it', function() {
    heap = new Heap();

    inserts(heap, 1, 2, 3, 4, 5);
    expect(heap.front()).toEqual(5);
    heap.deleteFront();
    expect(heap.front()).toEqual(4);

    inserts(heap, 56, 34, 5);
    expect(heap.front()).toEqual(56);
    heap.deleteFront();
    expect(heap.front()).toEqual(34);
  });

  var inserts = function() {
    for(var i = 1; i < arguments.length; i++) {
      arguments[0].insert(arguments[i]);
    }
  };
});
