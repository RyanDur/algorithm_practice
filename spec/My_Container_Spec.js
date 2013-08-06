describe('My_Container', function() {

  beforeEach(function() {
    container = new My_Container(100);
  });

  describe('init', function() {
    it('should create an instance with 100 values', function() {
      expect(container.size()).toEqual(100);
    });
  });
});
