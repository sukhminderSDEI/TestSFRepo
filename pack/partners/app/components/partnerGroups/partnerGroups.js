module.exports = function (ngModule) {
    ngModule.directive('partnerGroups', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./partnerGroups.html'),
            controllerAs: 'pvm',
            replace: true,
            controller: function ($scope, $ocModal){
                var pvm = this;
                window.pvm = pvm;
                var remoting = Visualforce.remoting.Manager;
                var partnerGroupControllerMapper = window.partnerGroupControllerMapper.remoteActions;

                /*pvm.groups = [
                                    {
                                        Name: "Organic Farms",
                                        members: [
                                            {
                                                name: "Driscoll Farms",   
                                                universalId: "1233211233",
                                                icixId: "1233211233",
                                                address: {
                                                    street: "PO BOX 50045",
                                                    city: "Watsonville",
                                                    state: "CA",
                                                    postCode: "95077-5045"
                                                },
                                                logoUrl: ""
                                            },
                                            {
                                                name: "Driscoll Farms",   
                                                universalId: "1233211233",
                                                icixId: "1233211233",
                                                address: {
                                                    street: "PO BOX 50045",
                                                    city: "Watsonville",
                                                    state: "CA",
                                                    postCode: "95077-5045"
                                                },
                                                logoUrl: "driscoll.jpg"
                                            }
                                        ]
                                    },
                                    {
                                        Name: "Poultry",
                                        members: [
                                            {
                                                name: "Driscoll Farms",   
                                                universalId: "1233211233",
                                                icixId: "1233211233",
                                                address: {
                                                    street: "PO BOX 50045",
                                                    city: "Watsonville",
                                                    state: "CA",
                                                    postCode: "95077-5045"
                                                },
                                                logoUrl: ""
                                            },
                                            {
                                                name: "Driscoll Farms",   
                                                universalId: "1233211233",
                                                icixId: "1233211233",
                                                address: {
                                                    street: "PO BOX 50045",
                                                    city: "Watsonville",
                                                    state: "CA",
                                                    postCode: "95077-5045"
                                                },
                                                logoUrl: "driscoll.jpg"
                                            }
                                        ]
                                    }
                                ]*/

                pvm.openDeleteDialog = function(group){
                    $ocModal.open({
                        template: require('./groupDeleteModal.html'),
                        init: {
                            pvm : pvm,
                            group: group
                        }
                    });
                };

                pvm.closeDeleteDialog = function(){
                    $ocModal.close();
                };

                pvm.toggleSelection = function(group){
                    pvm.selectedGroup = pvm.selectedGroup == group ? null : group
                }

                pvm.removeGroup = function(groups, group)
                {
                    for(var i = groups.length; i--;) {
                        if(groups[i] === group) {
                            groups.splice(i, 1);
                            return
                        }
                    }
                }

                pvm.cloneGroup = function(group)
                {
                    var clone = angular.copy(group)
                    clone.isNew = true
                    clone.Name = ""

                    return clone
                }

                pvm.loadMembers = function(groups){
                    window.groups = groups;
                    groups.forEach(function(group) {
                        remoting.invokeAction(partnerGroupControllerMapper.getGroupMembers, group.Name, function(result, event)
                        {            
                            group.members = result;
                        }); 
                    })
                    $scope.$digest();
                };

                pvm.delete = function(group){
                    pvm.closeDeleteDialog()

                    remoting.invokeAction(partnerGroupControllerMapper.deleteGroup, group.Id,
                        function(result, event) {
                            if(event.status){
                                pvm.removeGroup(pvm.groups, group);

                                $scope.$digest();
                            }
                    })
                }
				
                pvm.startCopy = function(group){
                    var clone = pvm.cloneGroup(group)

                    var index = pvm.groups.indexOf(group) + 1;
                    pvm.groups.splice(index, 0, clone);

                    pvm.toggleSelection(clone);
                }

                pvm.endCopy = function(group){
                    delete group.isNew

                    if (group.Name == ""){
                        group.Name = "New group"
                    }

                    /*remoting.invokeAction(partnerGroupControllerMapper.copyGroup, group.Id,
                        function(result, event) {
                    })*/
                }
				
                pvm.init = function(){            
                    pvm.groups = [];
                    
                    remoting.invokeAction(partnerGroupControllerMapper.listAllGroups, function(result, event)
                    {            
                        pvm.groups = result

                        $scope.$digest()

                        pvm.loadMembers(pvm.groups)
                    }); 
                };

                pvm.memberAddress = function(member)
                {
                    address = '';
                    if(member.BillingStreet) address += member.BillingStreet;

                    if(address && member.BillingCity)      address += ', ';                    
                    if(member.BillingCity) address += member.BillingCity; 

                    if(address && member.BillingState)     address += ', ';
                    if(member.BillingState) address += member.BillingState; 

                    if(address && member.BillingPostCode)  address += ' ';
                    if(member.BillingPostCode) address += member.BillingPostCode; 

                    if(address && member.BillingCountry)   address += ', '; 
                    if(member.BillingCountry) address += member.BillingCountry; 

                    return address;
                }

                pvm.init();
            }
        };
    });
};