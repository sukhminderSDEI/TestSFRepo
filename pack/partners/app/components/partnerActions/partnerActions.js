module.exports = function (ngModule) {
    ngModule.directive('partnerActions', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./partnerActions.html'),
            controllerAs: 'vm',
            replace: true,
            controller: function ($scope){
                var vm = this;
                var remoting = Visualforce.remoting.Manager;
                var partnerGroupControllerMapper = window.partnerGroupControllerMapper.remoteActions;

                vm.baseImageUrl = configSettings.baseImageUrl; 
                vm.groups = []; 

                remoting.invokeAction(partnerGroupControllerMapper.listAllGroups, function(result, event)
                {            
                    vm.groups = result;

                    $scope.$digest()
                }); 
            }
        };
    });
};