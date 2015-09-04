module.exports = function(ngModule){

    describe('Unit tesing is super simple', function() {
        var $compile,
            $rootScope;

        beforeEach(angular.mock.module(ngModule.name));

        beforeEach(inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('Replaces the element with the appropriate content', function() {
            var element = $compile("<simple-test></simple-test>")($rootScope);
            $rootScope.$digest();
                expect(element.html()).toContain("Writing 2 times the javascript rocks!");
            }); 
        });

};