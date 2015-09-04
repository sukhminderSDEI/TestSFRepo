module.exports = function(ngModule) {
    ngModule.directive('main', function() {
        return {
            restrict: 'E',
            scope: {},
            template: require('./main.html'),
            controllerAs: 'mainVm',
            replace: true,
            bindToController: true,
            controller: function($scope) {
                var mainVm = this
                window.mainVm = mainVm

                mainVm.ScreenEnum = Object.freeze({
                    Main: 1,
                    PartnerAdd: 2,
                    PartnerMatches: 3,
                    PartnerGroups: 4,
                    EditGroup: 5,
                    AddGroup: 6
                })

                mainVm.currentScreen = mainVm.ScreenEnum.Main

                mainVm.setScreen = function(screen) {
                    mainVm.currentScreen = screen

                    $scope.$digest()
                }
            }
        };
    });
};
