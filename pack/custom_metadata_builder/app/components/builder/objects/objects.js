module.exports = function (ngModule) {
    ngModule.directive('cmObjects', function () {

        return {
            restrict: 'E',
            scope: {
                        customMetadataObjects : '=',
                        selectedObject: '=',
                        selectedField: '=',
                        selectedRecord: '='
                    },
            template: require('./objects.html'),
            replace: true,
            controllerAs: 'vm',
            bindToController: true,
            controller: function ($log, $q) {
                var vm = this; // vm stands for "View Model" --> see https://github.com/johnpapa/angular-styleguide#controlleras-with-vm

                // load by default through vf page global var.
                //vm.existingCMObjects = this.customMetadataObject;
                 vm.setSelectObject = function(index){

                    $log.info(index);
                    vm.selectedObject = vm.customMetadataObjects[index];
                    vm.selectedField = vm.selectedObject.fields[0];
                    vm.selectedRecord = vm.selectedObject.records[0];

                };

               

            }
        
        };

    });
};