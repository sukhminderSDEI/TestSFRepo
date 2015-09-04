module.exports = function (ngModule) {
    if( ON_TEST ) {require('./newRequest.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('newRequest', function () {
        return {
            restrict: 'E',
            scope: {
                states : '=',
                showList: '=',
                selectedAttachments:'='
            },
            template: require('./newRequest.html'),
            controllerAs: 'vm',
            replace: true,
            bindToController: true,
            controller: function ($log, RecipentFactory) {

                var vm = this;
                vm.recipients = [];
                vm.searchTerm = { value: '' };

                vm.closeNewRequest = function(){

                    vm.states.activeRequest = '';
                    vm.states.activeListView = '';
                    vm.states.activeChartView = '';
                    vm.states.showRequestForm = '';
                    vm.states.showToolbar = '';

                };

                vm.search = function(searchTerm){

                    RecipentFactory(searchTerm).then(function(result){

                        // filters out results that are already select...
                        // TODO: possibly find a better way to do this check.
                        for(var r=0; r < result.length; r++){

                            for(var v=0; v < vm.recipients.length; r++){

                               if(vm.recipients[v].id === result[r].id && vm.recipients[v].disabled === true){

                                    result[r].disabled = true;

                               } 

                            }

                        }

                        vm.recipients = result;

                        $log.info('Your factory results ', result);

                    });

                };

            }

        };

    }).factory('RecipentFactory', ['$q', function ($q) {
    return function(searchTerm) {
        var deferred = $q.defer();
        Visualforce.remoting.Manager.invokeAction(
        newRequest.remoteActions.getRecipients,searchTerm,
            function(result, event) {
                    if (event.status) {
                        deferred.resolve(result);
                    } else {
                        deferred.reject(event);
                    }
            },
            { buffer: true, escape: false, timeout: 30000 });

             return deferred.promise;
         }
}]);
};