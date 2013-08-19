describe('LinearSearch', function() {
  var ls;
  var searchList;
  beforeEach(function() {
    searchList = [5,3,4,2,1,6,9,8,0,7];
    setFixtures($("<div class='demo'></div>"));
    ls = new LinearSearch(searchList);
    ls.insertInto($('.demo'));
  });

  describe('insertInto', function() {
    it('should insert the elements into the dom', function() {
      expect($('.collection > li')).toHaveLength(searchList.length);
    });
  });

  describe('search', function() {
    it('should search for a given value', function() {
      ls.search(8);
      expect($('.index7')).toHaveClass('found');

      ls.search(1);
      expect($('.index4')).toHaveClass('found');
    });
  });
});
