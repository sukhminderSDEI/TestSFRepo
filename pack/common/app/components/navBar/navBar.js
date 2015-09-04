module.exports = function (ngModule) {
    if( ON_TEST ) {require('./navBar.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('navBar', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./navBar.html'),
            controllerAs: 'vm',
            replace: true,
            controller: function () {

                var vm = this; 
                
                vm.one = 1;

                vm.showSearch = false;

                vm.links = [{
                                title: 'ICIX DASHBOARD',
                                linkUrl: '/apex/home'
                            },
                            {
                                title: 'PARTNERS',
                                linkUrl: '/apex/partners'
                            },
                            {
                                title: 'PRODUCTS',
                                linkUrl: '/apex/products'
                            },
                            {
                                title: 'REQUESTS',
                                linkUrl: '/apex/requests'
                            }];


                vm.isActive = function (linkTitle){

                    return (linkTitle === configSettings.activePage) ? true : false;

                };
            
            }   
        
        };

    });
};
