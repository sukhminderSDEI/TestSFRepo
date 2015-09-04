module.exports = function (ngModule) {
    ngModule.directive('cmFields', function () {

        return {
            restrict: 'E',
            scope: {
                selectedObject : '=',
                selectedField : '='
            },
            template: require('./fields.html'),
            replace: true,
            controllerAs: 'vm',
            bindToController: true,
            controller: function ( $log, $q) {
                var vm = this; // vm stands for "View Model" --> see https://github.com/johnpapa/angular-styleguide#controlleras-with-vm


                vm.setSelectedField = function(index){

                    vm.selectedField = vm.selectedObject.fields[index];

                };

            }
        
        };

    });
};