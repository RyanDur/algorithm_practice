describe('BinarySearch', function() {
  var bs;
  var searchList;

  beforeEach(function() {
    searchList = [0,1,2,3,4,5,6,7,8,9];
    setFixtures($("<div class='demo'></div>"));
    bs = new BinarySearch(searchList);
    bs.insertInto($('.demo').get(0));
  });

  describe('insertInto', function() {
    it('should insert the elements into the dom', function() {
      expect($('.collection > li')).toHaveLength(searchList.length);
    });
  });

  describe('search', function() {
    it('should repeatedly cut the list in half ignoring the half the value does not exist', function() {
      bs.search(8);
      expect($('.index0')).toHaveClass('ignore');
      expect($('.index1')).toHaveClass('ignore');
      expect($('.index2')).toHaveClass('ignore');
      expect($('.index3')).toHaveClass('ignore');
      expect($('.index4')).toHaveClass('ignore');
      expect($('.index5')).toHaveClass('ignore');
    });

    it('should mark the search target as found', function() {
      bs.search(4);
      expect($('.index4')).toHaveClass('found');

      bs.search(6);
      expect($('.index6')).toHaveClass('found');
      expect($('.index6')).not.toHaveClass('ignore');

      bs.search(9);
      expect($('.index9')).toHaveClass('found');
      expect($('.index9')).not.toHaveClass('ignore');
    });
  });
});
