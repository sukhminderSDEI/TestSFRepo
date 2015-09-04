module.exports = function (ngModule) {
    ngModule.directive('partnerMatchCard', function () {
        return {
            restrict: 'E',
            scope: { matchCard : '='},
            template: require('./partnerMatchCard.html'),
            controllerAs: 'vm',
            replace: true,
            bindToController: true,
            controller: function () {
                var vm = this;
            }
        };
    });
};