module.exports = function (ngModule) {
    if( ON_TEST ) {require('./main.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('main', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./main.html'),
            controllerAs: 'vm',
            replace: true,
            bindToController: true,
            controller: function () {

                var vm = this;

                vm.showList = {value: false};

                vm.selectedAttachments = [];

                

            }

        };

    });
};