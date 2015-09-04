module.exports = function (ngModule) {
    ngModule.directive('partnerGroupAdd', function () {
        return {
            restrict: 'E',
            scope: { },
            template: require('./partnerGroupAdd.html'),
            controllerAs: 'cvm',
            replace: true,
            controller: function ($scope){
                var cvm = this
                window.cvm = cvm

                cvm.init = function() {
                }

                cvm.init()
            }
        }
    });
};