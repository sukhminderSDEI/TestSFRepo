module.exports = function (ngModule) {
    ngModule.directive('cmField', function () {

        return {
            restrict: 'E',
            scope: {   
                    selectedField: '=',
                    deploymentStatus: '='
                    },
            template: require('./field.html'),
            replace: true,
            controllerAs: 'vm',
            bindToController: true,
            controller: function ($log, $q) {
                var vm = this; // vm stands for "View Model" --> see https://github.com/johnpapa/angular-styleguide#controlleras-with-vm

                vm.setStateToActive = function(){

                    vm.deploymentStatus.state = 'active';

                };

            }

        };

    });
};