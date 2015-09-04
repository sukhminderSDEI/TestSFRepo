module.exports = function (ngModule) {
    if( ON_TEST ) {require('./partnerProfile.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('partnerProfile', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./partnerProfile.html'),
            controllerAs: 'vm',
            replace: true,
            bindToController: true,
            controller: function ($log, PartnerProfileFactory) {

                var vm = this;

                vm.sortProductType = 'name'; // set the default sort type
                vm.sortProductReverse = false; // set the default sort order
                vm.searchProducts = ''; // set the default search/filter term
                vm.showSearchProducts = false;

                vm.sortDocumentType = 'name'; // set the default sort type
                vm.sortDocumentReverse = false; // set the default sort order
                vm.searchDocuments = ''; // set the default search/filter term
                vm.showSearchDocuments = false;


                vm.sortGroupType = 'name'; // set the default sort type
                vm.sortGroupReverse = false; // set the default sort order
                vm.searchGroups = ''; // set the default search/filter term
                vm.showSearchGroups = false;

                vm.partnerProfile;


                PartnerProfileFactory('001o000000XwSr9').then(function(result){

                    // filters out results that are already select...
                   
                    vm.partnerProfile = result;

                    vm.partnerProfile.icixId = '09123870192';

                    // temp mock data unil data source is resolved
                    vm.partnerProfile.incidents = [    
                                                        {
                                                            name: 'California Transparency form expired on 4/15/20015',
                                                            recordUrl: ''
                                                        }
                                                    ];

                    $log.info('Your factory results ', result);

                });


                /*vm.partnerProfile = {
                                        companyName: 'Driscoll Farms',
                                        status: 'noncompliant',
                                        street: 'PO Box 50046',
                                        cityStateZip: 'Watsonville, CA 95077-5045',
                                        logoUrl: 'http://www.careersatdriscolls.com/content/themes/driscolls/assets/images/logo/Driscolls_logo_CMYK.png',
                                        duns: '092830',
                                        icixId: '2346234',
                                        country: 'USA',
                                        website: 'www.driscolls.com',
                                        email: 'Mary@driscolls.com',
                                        phone: '1-800-871-3333',
                                        fax: '1-831-871-3331',
                                        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas laoreet, nunc at ullamcorper rhoncus, ipsum orci tempor est, a consequat eros erat non ligula. Aenean eget hendrerit est. Donec auctor orci massa, nec varius eros facilisis vitae. Fusce facilisis nisl ut gravida porta. Phasellus eros ipsum, volutpat non magna pulvinar, semper cursus diam. Pellentesque aliquam venenatis justo faucibus pulvinar. Aenean dignissim in justo id vulputate. Etiam sem sem, ullamcorper id ligula in, condimentum congue mauris. In hac habitasse platea dictumst. Phasellus pulvinar metus nisi, eget ullamcorper lectus malesuada id.',
                                        products:   [
                                                        {
                                                            name: 'Centeral Valley Organic Blueberry',
                                                            status: 'Active1',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 2',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 3',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 4',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 5',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 6',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 7',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 8',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 9',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 10',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },

                                                        {
                                                            name: 'Product 11',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 12',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 13',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },{
                                                            name: 'Product 14',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Product 15',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        }
                                                    ],
                                        documents:  [
                                                        {
                                                            name: 'California Transparrency Act form 2015',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 1',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 2',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 3',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 4',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 5',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 6',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 7',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 8',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 9',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 10',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Document 11',
                                                            status: 'Active',
                                                            recordUrl: ''
                                                        }
                                                    ],
                                        groups:     [
                                                        {
                                                            name: 'Centeral Valley Organic Blueberry',
                                                            recordUrl: ''
                                                        },
                                                        {
                                                            name: 'Vendors',
                                                            recordUrl: ''
                                                        }

                                                    ],
                                        incidents:  [    
                                                        {
                                                            name: 'California Transparency form expired on 4/15/20015',
                                                            recordUrl: ''
                                                        }
                                                    ]   

                                    };*/

            }

        };

    }).factory('PartnerProfileFactory', ['$q', function ($q) {
    return function(input) {
        var deferred = $q.defer();
        Visualforce.remoting.Manager.invokeAction(
        partnerProfile.remoteActions.getPartnerProfile,input,
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

//001o000000XwSr9