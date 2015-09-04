module.exports = function (ngModule) {
    ngModule.directive('cmRecords', function () {

        return {
            restrict: 'E',
            scope: {
                selectedObject : '=',
                selectedRecord : '='
            },
            template: require('./records.html'),
            replace: true,
            controllerAs: 'vm',
            bindToController: true,
            controller: function ( $log, $q) {
                var vm = this; // vm stands for "View Model" --> see https://github.com/johnpapa/angular-styleguide#controlleras-with-vm


                vm.setSelectedRecord = function(index){

                    vm.selectedRecord = vm.selectedObject.records[index];

                };

            }
        
        };

    });
};