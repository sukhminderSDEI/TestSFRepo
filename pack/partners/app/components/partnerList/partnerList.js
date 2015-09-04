module.exports = function (ngModule) {
    ngModule.directive('partnerList', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./partnerList.html'),
            controllerAs: 'vm',
            replace: true,
            controller: function ($scope){
                var remoting = Visualforce.remoting.Manager;
                var partnerControllerMapper = window.partnerControllerMapper.remoteActions;

                var vm = this;
                vm.partnerList = []; 
                vm.query = "";

                $scope.onsearchchange = function() {
                    remoting.invokeAction(partnerControllerMapper.getPartnersByName, vm.query, function(result, event)
                    {            
                        vm.partnerList = result;

                        $scope.$digest();
                    });
                }; 

                $scope.resetsearch = function() {
                    vm.query = "";
                    $scope.onsearchchange(); 
                };

                $scope.onsearchchange();   
            }
        };
    });
};