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

      forEach($('.collection > li'), function(li, index) {
        expect(parseInt(li.innerHTML)).toEqual(index);
      });
    });
  });

  describe('search', function() {
    it('should return a queue of functions', function() {
      var queue = bs.search(8);

      expect(queue.length).toBeGreaterThan(0);
      forEach(queue, function(elem) {
        expect(typeof elem).toEqual("function");
      });
    });

    it('should return an instruction set that finds the element', function() {
      jasmine.Clock.useMock();
      var queue = bs.search(8);

      executeAsynchronously(queue, 1);
      jasmine.Clock.tick(100);
      expect(parseInt($('.index8').html())).toEqual(8);
      expect($('.index8')).toHaveClass('found');
    });
  });

  describe('cleanElements', function() {
    it('should reset the elements if called multiple times', function() {
      jasmine.Clock.useMock();

      var queue = bs.search(5);
      executeAsynchronously(queue, 1);
      jasmine.Clock.tick(1000);

      bs.claenElements();
      forEach($('.collection > li'), function(li) {
        expect(li).not.toHaveClass('found');
        expect(li).not.toHaveClass('search');
        expect(li).not.toHaveClass('ignore');
      });
    });
  });
});
