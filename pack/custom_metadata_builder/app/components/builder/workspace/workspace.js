require('node-zip');
var jsforce = require('jsforce');
/*npm*/
module.exports = function(ngModule){
    ngModule.directive('cmWorkspace', function(){
        
        return {
            restrict: 'E',
            scope: {
                selectedObject: '=',
                selectedField: '=',
                selectedRecord: '=',
                deploymentStatus: '='
            },
            template: require('./workspace.html'),
            replace: true,
            controllerAs: 'vm',
            bindToController: true,
            controller: function($q, $log,$scope) {
                var vm = this; // vm stands for "View Model" --> see https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
                vm.cmObjectType = {};

                vm.selectedField = vm.selectedObject.fields[0];

                vm.setStateToActive = function(){

                    vm.deploymentStatus.state = 'active';

                };

            }
        };

    });
};


