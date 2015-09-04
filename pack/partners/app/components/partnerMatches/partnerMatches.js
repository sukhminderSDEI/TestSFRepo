module.exports = function (ngModule) {
    require("!style!css!less!./partnerMatchCard.less");
    require('./partnerMatchCard')(ngModule);

    ngModule.directive('partnerMatches', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./partnerMatches.html'),
            controllerAs: 'mvm',
            replace: true,
            bindToController: true,
            controller: function ($scope) {
                var remoting = Visualforce.remoting.Manager;
                var partnerControllerMapper = window.partnerControllerMapper.remoteActions;

                var mvm = this;
                window.mvm = mvm;

                mvm.buildPartner = function(partner){
                    return {
                            name: partner.name,
                            universalIds: [{ 
                                type: partner.idType,
                                value: partner.universalId
                            }],
                            ubeId: partner.icixId,
                            address: partner.address,
                            emailDomains: [ partner.email ],
                            phone: partner.phone1 + partner.phone2 + partner.phone3,
                            fax: partner.fax1 + partner.fax2 + partner.fax3,
                            //partnerType  : "" 
                        };
                }

                mvm.searchPartnersInOtherOrgs = function(partner) {
                    partner = mvm.buildPartner(partner);

                    remoting.invokeAction(partnerControllerMapper.searchPartnersInOtherOrgs, partner, function(result, event)
                    {  
                        if(result == null || result == []){
                            partner.matchingPercentage = 0;
                            mvm.partnerMatches =  [partner];     
                        }else{
                            mvm.partnerMatches = result;
                        }

                        $scope.$apply();
                    });
                };

                mvm.init = function() {
                    mvm.partnerMatches = [];
                }; 

                mvm.init();
            }
        };
    });
};