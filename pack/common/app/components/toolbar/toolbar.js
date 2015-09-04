module.exports = function (ngModule) {
    if( ON_TEST ) {require('./toolbar.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('toolBar', function () {
        return {
            restrict: 'E',
            scope: {
                showList: '=',
                selectedAttachments:'='
            },
            template: require('./toolbar.html'),
            controllerAs: 'vm',
            replace: true,
            bindToController: true,
            controller: function () {

                var vm = this;
                vm.states = {};

                vm.toogleActive = function(activeName){

                    if(activeName === 'new-request'){

                        vm.states.activeRequest = 'isActive';
                        vm.states.activeListView = '';
                        vm.states.activeChartView = '';
                        vm.states.showRequestForm = 'showRequestForm';
                        vm.states.showToolbar = 'show-toolbar';

                    }else if(activeName === 'list-view'){

                        vm.states.activeRequest = '';
                        vm.states.activeListView = 'isActive';
                        vm.states.activeChartView = '';
                        vm.states.showRequestForm = '';
                        vm.states.showToolbar = 'show-toolbar';

                    }else if(activeName === 'chart-view'){

                        vm.states.activeRequest = '';
                        vm.states.activeListView = '';
                        vm.states.activeChartView = 'isActive';
                        vm.states.showRequestForm = '';
                        vm.states.showToolbar = 'show-toolbar';

                    }

                }


            }

        };

    });
};
