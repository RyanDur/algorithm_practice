describe('MyContainer', function() {
    var container;

    beforeEach(function() {
        container = new MyContainer(100);
    });

    describe('size', function() {
        it('should return the size of the container', function() {
            expect(container.size()).toEqual(100);

            container = new MyContainer(10);
            expect(container.size()).toEqual(10);

            container = new MyContainer([1,2,3]);
            expect(container.size()).toEqual(3);
        });
    });

    describe('get', function() {
        it('should return the value at the given index', function() {
            expect(container.get(3)).toEqual(3);
            expect(container.get(63)).toEqual(63);
            expect(container.get(77)).toEqual(77);
        });
    });

    describe('set', function() {
        it('should set the value at the index given', function() {
            expect(container.get(14)).toEqual(14);
            container.set(14, 53);
            expect(container.get(14)).toEqual(53);

            expect(container.get(50)).toEqual(50);
            container.set(50, 2);
            expect(container.get(50)).toEqual(2);

            expect(container.get(41)).toEqual(41);
            container.set(41, 1000);
            expect(container.get(41)).toEqual(1000);
        });
    });

    describe('swap', function() {
        it('should swap the values at the positions given', function() {
            var container = new MyContainer(10);
            var swappedContainer = new MyContainer([0,1,2,3,5,4,6,7,8,9]);
            container.swap(4,5);

            expect(container).toEqual(swappedContainer);
        });
    });
});
