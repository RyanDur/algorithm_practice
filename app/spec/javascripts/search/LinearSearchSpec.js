describe('LinearSearch', function() {
  var ls;
  var searchList;
  beforeEach(function() {
    searchList = [5,3,4,2,1,6,9,8,0,7];
    setFixtures($("<div class='demo'></div>"));
    ls = new LinearSearch($('.demo').get(0), searchList);
    jasmine.Clock.useMock();
  });

  describe('init', function() {
    it('should insert the elements into the dom', function() {
      expect($('.collection > li')).toHaveLength(searchList.length);
    });
  });

  describe('search', function() {
    it('should search for a given value', function() {
      ls.search(8);
      jasmine.Clock.tick(10000);
      expect($('.index7')).toHaveClass('found');

      ls.search(1);
      jasmine.Clock.tick(10000);
      expect($('.index4')).toHaveClass('found');
    });

    it('should only have one search class in the list', function() {
      ls.search(8);
      jasmine.Clock.tick(7000);
      expect($('.index0')).not.toHaveClass('found');
      expect($('.index1')).not.toHaveClass('found');
      expect($('.index2')).not.toHaveClass('found');
      expect($('.index3')).not.toHaveClass('found');
      expect($('.index4')).not.toHaveClass('found');
      expect($('.index5')).not.toHaveClass('found');
      expect($('.index6')).not.toHaveClass('found');

      expect($('.index7')).toHaveClass('found');
      expect($('.index7')).toHaveClass('search');

      expect($('.index8')).not.toHaveClass('found');
      expect($('.index9')).not.toHaveClass('found');
    });
  });
});
