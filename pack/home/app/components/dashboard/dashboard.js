module.exports = function (ngModule) {
    if( ON_TEST ) {require('./dashboard.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('dashBoard', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./dashboard.html'),
            controllerAs: 'vm',
            replace: true,
            bindToController: true,
            controller: function () {

                var vm = this;


            }

        };

    });
};
