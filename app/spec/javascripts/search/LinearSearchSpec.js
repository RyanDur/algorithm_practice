describe('LinearSearch', function() {
  var ls;
  var searchList;
  beforeEach(function() {
    searchList = [5,3,4,2,1,6,9,8,0,7];
    setFixtures($("<div class='demo'></div>"));
    ls = new LinearSearch($('.demo').get(0), searchList);
  });

  describe('init', function() {
    it('should insert the elements into the dom', function() {
      expect($('.collection > li')).toHaveLength(searchList.length);
    });
  });

  describe('search', function() {
    beforeEach(function() {
      jasmine.Clock.useMock();
    });

    it('should search for a given value', function() {
      ls.search(8);
      jasmine.Clock.tick(10000);
      expect($('.index7')).toHaveClass('found');

      ls.search(1);
      jasmine.Clock.tick(10000);
      expect($('.index4')).toHaveClass('found');
    });

    it('should only have one search and one found class in the list', function() {
      ls.search(8);
      jasmine.Clock.tick(8000);
      expect($('.index0')).not.toHaveClass('found');
      expect($('.index0')).not.toHaveClass('search');

      expect($('.index1')).not.toHaveClass('found');
      expect($('.index1')).not.toHaveClass('search');

      expect($('.index2')).not.toHaveClass('found');
      expect($('.index2')).not.toHaveClass('search');

      expect($('.index3')).not.toHaveClass('found');
      expect($('.index3')).not.toHaveClass('search');

      expect($('.index4')).not.toHaveClass('found');
      expect($('.index4')).not.toHaveClass('search');

      expect($('.index5')).not.toHaveClass('found');
      expect($('.index5')).not.toHaveClass('search');

      expect($('.index6')).not.toHaveClass('found');
      expect($('.index6')).not.toHaveClass('search');

      expect($('.index7')).toHaveClass('found');
      expect($('.index7')).toHaveClass('search');

      expect($('.index8')).not.toHaveClass('found');
      expect($('.index8')).not.toHaveClass('search');

      expect($('.index9')).not.toHaveClass('found');
      expect($('.index9')).not.toHaveClass('search');
    });

    it('should stop animation and return if the value is not in the list', function() {
      ls.search(10);
      jasmine.Clock.tick(10000);
      forEach($('.collection > li'), function(li) {
        expect(li).not.toHaveClass('search');
        expect(li).not.toHaveClass('found');
      });
    });
  });
});
