describe('LinearSearch', function() {
  var ls;
  var searchList;
  beforeEach(function() {
    searchList = [5,3,4,2,1,6,9,8,0,7];
    setFixtures($("<div class='demo'></div>"));
    ls = new LinearSearch(searchList);
    ls.insertInto($('.demo').get(0));
    jasmine.Clock.useMock();
  });

  xdescribe('insertInto', function() {
    it('should insert the elements into the dom', function() {
      expect($('.collection > li')).toHaveLength(searchList.length);
    });
  });

  xdescribe('search', function() {
    it('should search for a given value', function() {
      ls.search(8);
      jasmine.Clock.tick(11);
      expect($('.index7')).toHaveClass('found');

      ls.search(1);
      expect($('.index4')).toHaveClass('found');
    });

    it('should only have one search class in the list', function() {
      //      ls.search(8);
      //      expect($('.index7')).toHaveClass('found');
    });
  });
});
