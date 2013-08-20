describe('BinarySearch', function() {
  var bs, searchList;

  beforeEach(function() {
    searchList = [0,1,2,3,4,5,6,7,8,9];
    setFixtures($("<div class='demo'></div>"));
    bs = new BinarySearch($('.demo').get(0));
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

    it('should repeatedly cut the list in half ignoring the half the value does not exist', function() {
      bs.search(8);
      for(var i = 0; i < 10; i++) {
        expect($('.index' + i)).not.toHaveClass('found');
        expect($('.index' + i)).not.toHaveClass('search');
        expect($('.index' + i)).not.toHaveClass('ignore');
      }

      jasmine.Clock.tick(2000);
      for(var i = 0; i < 10; i++) {
        expect($('.index' + i)).not.toHaveClass('found');
      }
      expect($('.index0')).not.toHaveClass('ignore');
      expect($('.index1')).not.toHaveClass('ignore');
      expect($('.index2')).not.toHaveClass('ignore');
      expect($('.index3')).not.toHaveClass('ignore');

      expect($('.index4')).toHaveClass('search');

      expect($('.index5')).not.toHaveClass('ignore');
      expect($('.index6')).not.toHaveClass('ignore');
      expect($('.index7')).not.toHaveClass('ignore');
      expect($('.index8')).not.toHaveClass('ignore');

      jasmine.Clock.tick(2000);
      for(var i = 0; i < 10; i++) {
        expect($('.index' + i)).not.toHaveClass('found');
      }
      expect($('.index0')).toHaveClass('ignore');
      expect($('.index1')).toHaveClass('ignore');
      expect($('.index2')).toHaveClass('ignore');
      expect($('.index3')).toHaveClass('ignore');

      expect($('.index4')).toHaveClass('ignore');
      expect($('.index4')).not.toHaveClass('search');

      expect($('.index5')).not.toHaveClass('ignore');
      expect($('.index6')).not.toHaveClass('ignore');

      expect($('.index7')).toHaveClass('search');
      expect($('.index7')).not.toHaveClass('ignore');

      expect($('.index8')).not.toHaveClass('ignore');
      expect($('.index9')).not.toHaveClass('ignore');

      jasmine.Clock.tick(2000);
      expect($('.index0')).toHaveClass('ignore');
      expect($('.index1')).toHaveClass('ignore');
      expect($('.index2')).toHaveClass('ignore');
      expect($('.index3')).toHaveClass('ignore');
      expect($('.index4')).toHaveClass('ignore');
      expect($('.index5')).toHaveClass('ignore');
      expect($('.index6')).toHaveClass('ignore');

      expect($('.index7')).toHaveClass('ignore');
      expect($('.index7')).not.toHaveClass('search');

      expect($('.index8')).not.toHaveClass('ignore');
      expect($('.index8')).toHaveClass('search');
      expect($('.index8')).toHaveClass('found');

      expect($('.index9')).not.toHaveClass('ignore');
    });

    it('should mark the search target as found', function() {
      bs.search(4);
      jasmine.Clock.tick(8000);
      expect($('.index4')).toHaveClass('found');

      bs.search(6);
      jasmine.Clock.tick(8000);
      expect($('.index6')).toHaveClass('found');
      expect($('.index6')).not.toHaveClass('ignore');

      bs.search(9);
      jasmine.Clock.tick(8000);
      expect($('.index9')).toHaveClass('found');
      expect($('.index9')).not.toHaveClass('ignore');
    });
  });
});
