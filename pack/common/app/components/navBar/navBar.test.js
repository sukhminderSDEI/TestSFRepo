module.exports = function (ngModule) {

    describe('Navbar test', function () {
        var $compile,
            $rootScope;

        beforeEach(angular.mock.module(ngModule.name));

        beforeEach(inject(function ( _$compile_, _$rootScope_) {
            window.configSettings.activePage = 'ICIX DASHBOARD';
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('Should have ICIX DASHBOARD as the first link.', function () {
            var element = $compile("<nav-bar></nav-bar>")($rootScope);
            $rootScope.$digest();
                expect(element.children()
                            .children()
                            .children()
                            .next()
                            .children()
                            .children()
                            .html()) // using jqLite which does not support selector look up walk the DOM to the first link.
                .toContain("ICIX DASHBOARD");
            });
    


        it('Should have the.active as a class.', function () {
            var element = $compile("<nav-bar></nav-bar>")($rootScope);
            $rootScope.$digest();
                expect(element.children()
                            .children()
                            .children()
                            .next()
                            .children()
                            .children()
                            .html()) // using jqLite which does not support selector look up walk the DOM to the first link.
                .toContain('active');
            });
        });

};
