describe('BubbleSort', function() {
  var unsortedCollection, sortedCollection, bs;
  beforeEach(function() {
    setFixtures($("<div class='demo'></div>"));
    unsortedCollection = [9,8,7,6,5,4,3,2,1,0];
    sortedCollection = [0,1,2,3,4,5,6,7,8,9];
    bs = new BubbleSort($('.demo').get(0), [9,8,7,6,5,4,3,2,1,0]);
  });

  describe('sort', function() {
    it('should sort a list', function() {
      expect($('.collection > li').length-2).toEqual(unsortedCollection.length);

      execute(bs.sort());

      for(var i = 0; i < sortedCollection.length; i++) {
        expect(parseInt($('.collection > li')[i].innerHTML)).toEqual(i);
      }
    });
  });

  describe('reset', function() {
    it('should reset the collection', function() {
      var oldCollection = bs.collection;
      bs.reset();
      expect(bs.collection).not.toEqual(oldCollection);

      forEach(bs.elements, function(element) {
        expect(element).not.toHaveClass('search');
      });
    });
  });
});
