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
    it('should return an instruction set that finds the element', function() {
      var queue = ls.search(8);
      expect(queue.length).toBeGreaterThan(0);

      forEach(queue, function(elem) {
        expect(typeof elem).toEqual("function");
      });

      queue = ls.search(3);
      forEach(queue, function(func) {
        func();
      });

      expect($('.index1')).toHaveClass('found');

      queue = ls.search(7);
      forEach(queue, function(func) {
        func();
      });

      expect($('.index9')).toHaveClass('found');
    });
  });

  describe('cleanElements', function() {
    it('should reset the elements if called multiple times', function() {
      var queue = ls.search(7);
      forEach(queue, function(func) {
        func();
      });

      ls.cleanElements();

      forEach($('.collection > li'), function(li) {
        expect(li).not.toHaveClass('search');
        expect(li).not.toHaveClass('found');
      });
    });
  });
});
