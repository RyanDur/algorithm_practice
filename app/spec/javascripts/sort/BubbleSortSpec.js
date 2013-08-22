describe('BubbleSort', function() {
    it('should sort a list', function() {
        setFixtures($("<div class='demo'></div>"));
        var unsortedCollection = [9,8,7,6,5,4,3,2,1,0];
        var sortedCollection = [0,1,2,3,4,5,6,7,8,9];
        var bs = new BubbleSort($('.demo').get(0), [9,8,7,6,5,4,3,2,1,0]);

        expect($('.collection > li').length).toEqual(unsortedCollection.length);

        bs.sort();
        forEach($('.collection > li'), function(li, index) {
            expect(parseInt(li.innerHTML, 10)).toEqual(index);
        });
    });
});
