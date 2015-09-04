module.exports = function (ngModule) {

    describe('Partner Profile Tests', function () {
        var $compile,
            $rootScope;

        beforeEach(angular.mock.module(ngModule.name));

        beforeEach(inject(function ( _$compile_, _$rootScope_) {
            configSettings.activePage = 'PARTNERS'
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('should have an index greater than 0 in the products list', function () {
            var element = $compile("<partner-profile><partner-profile>")($rootScope);
            $rootScope.$digest();

            // if product 10 exist then we know the list has rendered
            expect(element.html()).toContain("Product 10");
        });

        it('should have an index greater than 0 in the Documents list', function () {
            var element = $compile("<partner-profile><partner-profile>")($rootScope);
            $rootScope.$digest();

            // if document 10 exist then we know the list has rendered
            expect(element.html()).toContain("Document 10");
        });

    });

};