module.exports = function(ngModule) {
    ngModule.directive('partnerGroupEdit', function() {
        return {
            restrict: 'E',
            scope: {},
            template: require('./partnerGroupEdit.html'),
            controllerAs: 'evm',
            replace: true,
            controller: function($scope, $ocModal) {
                var evm = this
                window.evm = evm
                var remoting = Visualforce.remoting.Manager;
                var partnerGroupControllerMapper = window.partnerGroupControllerMapper.remoteActions;

                evm.tabs = [{
                    title: "Partners",
                    icon: "glyphicon-user",
                    enabled: true,
                    attributes: []
                }, {
                    title: "Products",
                    icon: "glyphicon-inbox",
                    enabled: false,
                    attributes: []
                }]

                evm.openDeleteDialog = function(group) {
                    $ocModal.open({
                        template: require('./groupDeleteModal.html'),
                        init: {
                            evm: evm,
                            group: evm.selectedGroup
                        }
                    });
                };

                evm.closeDeleteDialog = function() {
                    $ocModal.close();
                };

                evm.selectTab = function(tab) {
                    evm.selectedTab = tab

                    if (evm.selectedTab.enabled && evm.selectedTab.attributes.length == 0) {
                        evm.loadAllAttributes(evm.selectedTab)
                    }
                }

                evm.selectAttribute = function(attribute) {
                    evm.selectedAttribute = attribute
                }

                evm.getCheckedValuesCount = function(attribute) {
                    var count = 0
                    if (attribute.values > 0) {
                        attribute.values.forEach(function(value) {
                            if (value.checked) {
                                count++
                            }
                        })
                    }
                    return count
                }

                evm.loadAllAttributes = function(tab) {
                    remoting.invokeAction(partnerGroupControllerMapper.getAllAttributes, function(result, event) {
                        tab.attributes = result

                        if (tab.attributes.length > 0) {
                            evm.selectAttribute(tab.attributes[0])

                            tab.attributes.forEach(function(attribute) {
                                attribute.checkedValuesCount = evm.getCheckedValuesCount(attribute)
                            })

                            $scope.$digest()

                            evm.loadGroupAttributes(evm.selectedGroup)
                        }
                    })
                }

                evm.loadGroupAttributes = function(group) {
                    remoting.invokeAction(partnerGroupControllerMapper.getGroupAttributes, group.Name, function(result, event) {
                        if (evm.oldAttributes == null) {
                            evm.oldAttributes = result
                        }
                        evm.selectedTab.attribute = evm.mergeAttributes(evm.selectedTab.attributes, result)

                        evm.selectAttribute(evm.selectedTab.attributes[0])

                        $scope.$digest()
                    })
                }

                evm.mergeAttributes = function(allAttributes, groupAttributes) {
                    allAttributes.forEach(function(attribute) {
                        attribute.values = []
                        groupAttributes.forEach(function(gAttribute) {
                            if (attribute.Name == gAttribute.Attribute__r.Name) {
                                attribute.values.push({
                                    name: gAttribute.Attribute_Value__c,
                                    checked: true
                                })
                            }
                        })
                    })
                }

                evm.getGroupMembers = function(group) {
                    remoting.invokeAction(partnerGroupControllerMapper.getGroupMembers, group.Name, function(result, event) {
                        group.members = result;

                        $scope.$digest()
                    });
                };

                evm.onChanged = function(group) {
                    evm.newAttributes = evm.selectedTab.attributes

                    evm.getGroupMembers(group)
                }

                evm.delete = function(group) {
                    evm.closeDeleteDialog()

                    remoting.invokeAction(partnerGroupControllerMapper.deleteGroup, group.Id,
                        function(result, event) {
                            if (event.status) {
                                window.pvm.init()
                            }
                            mainVm.setScreen(mainVm.ScreenEnum.PartnerGroups)
                        })
                }

                evm.save = function(group) {
                    toDelete = []
                    toCreate = []

                    if (evm.newAttributes != null) {
                        /*evm.oldAttributes.forEach(function(oAttribute) {
                            var found = false
                            evm.newAttributes.forEach(function(nAttribute) {                   
                                if (oAttribute.Attribute__r.Name == nAttribute.Name) {
                                    found = true
                                    return
                                }
                            })

                            if (found) {
                                toDelete.push(oAttribute)
                            }
                        })
                        evm.newAttributes.forEach(function(nAttribute) {
                            var found = false
                            evm.oldAttributes.forEach(function(oAttribute) {
                                if (oAttribute.Attribute__r.Name == nAttribute.Name) {
                                    found = true
                                    return
                                }
                            })

                            if (!found) {
                                toCreate.push(nAttribute)
                            }
                        })
                        console.log("del: " + toDelete.length)
                        console.log("create: " + toCreate.length)

                        toDelete.forEach(function(attribute) {
                            remoting.invokeAction(partnerGroupControllerMapper.deleteGroupAttribute, group.Id, attribute.Id,
                                function(result, event) {})
                        })
                        toCreate.forEach(function(attribute) {
                            remoting.invokeAction(partnerGroupControllerMapper.setGroupAttribute, group.Id, attribute.Id, attribute.Attribute_Value__c,
                                function(result, event) {})
                        })*/

                        evm.oldAttributes.forEach(function(attribute) {
                            remoting.invokeAction(partnerGroupControllerMapper.deleteGroupAttribute, group.Id, attribute.Id,
                                function(result, event) {})
                        })
                        evm.newAttributes.forEach(function(attribute) {
                            remoting.invokeAction(partnerGroupControllerMapper.setGroupAttribute, group.Id, attribute.Id, attribute.Attribute_Value__c,
                                function(result, event) {})
                        })
                    }

                    mainVm.setScreen(mainVm.ScreenEnum.PartnerGroups)
                }

                evm.init = function(group) {
                    evm.selectedGroup = group
                    evm.newAttributes = null

                    evm.selectTab(evm.tabs[0])
                }
            }
        }
    })
}
