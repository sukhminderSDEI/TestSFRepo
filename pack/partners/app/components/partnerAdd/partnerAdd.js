module.exports = function (ngModule) {
    ngModule.directive('partnerAdd', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./partnerAdd.html'),
            controllerAs: 'avm',
            replace: true,
            controller: function ($scope){    
                var remoting = Visualforce.remoting.Manager;
                var partnerControllerMapper = window.partnerControllerMapper.remoteActions;
                         
                var avm = this;
                window.avm = avm;

                avm.typesList = [];
                avm.newPartner = {};

                avm.loadIdTypes = function() {
                    remoting.invokeAction(partnerControllerMapper.getAllUniversalIdTypes, function(result, event)
                    {            
                        avm.typesList = result;
                        $scope.$apply();
                    });
                }; 

                avm.loadPartnerTypes = function() {
                    remoting.invokeAction(partnerControllerMapper.getAllPartnerTypes, function(result, event)
                    {            
                        avm.partnerTypesList = result;
                        $scope.$apply();
                    });
                }; 

                avm.init = function(){
                    avm.newPartner = {
                            name: "",
                            idType: "",       
                            universalId: "",
                            icixId: "",
                            address: {
                                street: "",
                                city: "",
                                state: "",
                                postCode: "",
                                country: ""
                            },
                            email: "",
                            phone1: "",
                            phone2: "",
                            phone3: "",
                            fax1: "",
                            fax2: "",
                            fax3: "",
                            //partnerType  : "" 
                        }
                    /*avm.newPartner = {
                            name: "Big UBE",
                            idType: "DUNS",       
                            universalId: "15-048-3782",
                            icixId: "1",
                            address: {
                                street: "Wilington St.",
                                city: "Aberdeen",
                                state: "AB",
                                postCode: "4567",
                                country: "GB"
                            },
                            email: "123@bigube.com",
                            phone1: "708",
                            phone2: "503",
                            phone3: "1884",
                            fax1: "708",
                            fax2: "503",
                            fax3: "4567",
                            //partnerType  : "" 
                        }*/

                    avm.loadIdTypes();
                    avm.loadPartnerTypes();                 
                }

                avm.init();
            }
        };
    });
};