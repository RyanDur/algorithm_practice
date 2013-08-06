describe('LinearSearch', function() {

    describe('search', function() {
        var ls, container;

        beforeEach(function() {
            ls = new LinearSearch();
            container = new MyContainer(10);
        });

        it('should return the first index found containing the value given', function() {
            expect(ls.search(container, 5)).toEqual(5);
            expect(ls.search(container, 9)).toEqual(9);
            expect(ls.search(container, 1)).toEqual(1);
        });

        it('should return undefined if the value search does not exist', function() {
            expect(ls.search(container, 10)).toEqual(undefined);
        });
    });
});
