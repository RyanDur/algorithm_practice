describe('InsertionSort', function() {

    describe('sort', function() {
        var is, container;
        beforeEach(function() {
            is = new InsertionSort();
            container = new MyContainer([9,8,7,6,5,4,3,2,1,0]);
            sortedContainer = new MyContainer(10);
        });

        it('should sort the container', function() {
            expect(is.sort(container)).toEqual(sortedContainer);

            container = new MyContainer([9,3,2,4,1,5,6,0,7,8]);
            expect(is.sort(container)).toEqual(sortedContainer);
        });
    });
});
