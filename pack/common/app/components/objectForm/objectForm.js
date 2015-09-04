module.exports = function (ngModule) 
{
    ngModule.directive('objectForm', function () 
    {
        return {
            scope: {},
            template: require('./objectForm.html'),
            controllerAs: 'vm',
            bindToController: true,
            replace: true,
            controller: function ($scope)
            {
                var vm = this; 
                window.vm = vm;
                document.title = vm.title = "California Transparency of Supply Chain Act";
                vm.intro = "As of January 1, 2012, California's Civil Code section 1714.43 (California Transparency in Supply Chains Act of 2010) requires manufacturers and retailers to provide website information concerning their efforts to address the issues of forced labor, slavery, and human trafficking within the supply chain.  The purpose is to allow consumers to make better and more informed decisions about the products they buy and the companies they support. To assist Raley's in addressing this law, each Raley's supplier must respond to the questions below:";

                vm.recordId =  window.recordId;
                var remoting = Visualforce.remoting.Manager;
                var remoteActions = window.configSettings.remoteActions;

                vm.initModelData = window.initModelData;
                vm.initFormData = window.initFormData;

                // TODO: nested questions under dependent answer
                //conditions to display each field
                vm.fieldDependencies = 
                {
                    certify_materials_comply__c: {},
                    certify_materials_comply_file__c: { certify_materials_comply__c: "Yes" },
                    have_program_in_place__c: { certify_materials_comply__c: "No"}, 
                    have_program_in_place_description__c: { have_program_in_place__c: "Yes"},
                    third_party_identify__c: { certify_materials_comply__c: "No"},
                    third_party_identify_description__c:  { third_party_identify__c: "Yes"},
                    conduct_independent_unannounced__c: { certify_materials_comply__c: "No"},
                    conduct_independent_unannounced_descript__c: { conduct_independent_unannounced__c: "Yes"},
                    have_company_standards__c: { certify_materials_comply__c: "No"},
                    have_company_standards_description__c: { have_company_standards__c : "Yes"},
                    management_been_trained__c: { certify_materials_comply__c: "No"},
                    management_been_trained_description__c: { management_been_trained__c: "Yes"},
                    require_suppliers_certify__c: { certify_materials_comply__c: "No"},
                    require_suppliers_certify_description__c: { require_suppliers_certify__c: "Yes"},
                    signature__c: {}
                }

                vm.status="";
                vm.formData = {};
                vm.recordData = {};
                vm.step=0;
                vm.showDebug=false;

                vm.buildProperties = function(map) 
                {
                    vm.properties = [];                    
                    for (var key in vm.fieldDependencies)
                    {
                        var prop = map[key.toLowerCase()];
                        prop.key = key; 
                        vm.properties.push(prop);
                        vm.properties[key] = prop;

                        //build list of nested Fields
                        var dependencies = vm.fieldDependencies[key];
                        if(angular.isObject(dependencies))
                            for (var parent in dependencies)
                            {
                                parentAnswer = dependencies[parent];
                                parentDep = vm.fieldDependencies[parent];
                                if(angular.isObject(parentDep))
                                {
                                    if(!parentDep.nested)
                                       parentDep.nested={};
                                    if(!parentDep.nested[parentAnswer])
                                        parentDep.nested[parentAnswer] = [];
                                    parentDep.nested[parentAnswer].push(key);
                                }
                            }
                    }
                    return vm.properties;
                }

                //display field if dependent field conditions are met

                vm.isRootQuestion = function(key) 
                {
                    var dependencies = vm.fieldDependencies[key];
                    return dependencies===true;
                }

                vm.getProperty = function(key)
                {
                   return vm.properties[key];
                }

                vm.getNested = function(key, val)
                {
                    if(!vm.fieldDependencies[key].nested) return [];
                    return vm.fieldDependencies[key].nested[val] || [];
                }

                vm.isDisplayed = function(key)
                {
                    var dependencies = vm.fieldDependencies[key];
                    if(!dependencies) return false;
                    if(dependencies===true) return true;
                    result=true;
                    for (var parent in dependencies)
                    {
                        if(!parent || parent=="nested") continue;
                        //check if parent dependent field is displayed too
                        if(!vm.isDisplayed(parent) || vm.formData[parent] != dependencies[parent]) 
                            result = false;
                    }

                    //if this field is not displayed, clear its value. submit empty value;
                    if(!result && vm.formData[key])
                    {
                        console.log("clearing field " + key + " = " +vm.formData[key]);
                        vm.formData[key]=null; //clear value for this field
                    }
                    return result;
                }

                //Do all displayed field have a value ?
                vm.isFormComplete = function() 
                {
                    for (var field in vm.fieldDependencies)
                        if(vm.isDisplayed(field) && !vm.formData[field]) 
                            return false;
                    return true;
                }

                vm.isUpdateable = function(key)
                {
                    return vm.fieldDescriptions 
                    && vm.fieldDescriptions[key] 
                    && vm.fieldDescriptions[key].updateable;
                }

                vm.isPicklist = function(key)
                {
                    return vm.fieldDescriptions 
                    && vm.fieldDescriptions[key] 
                    && vm.fieldDescriptions[key].type == "picklist";
                }

                vm.formatValue = function(prop)
                {
                    var value = vm.formData[prop.key];
                    if(prop.type == "date" || prop.type == "datetime")
                        return new Date(parseInt(value)).toString();
                    return value;
                }

                vm.formDataJson = function()
                {
                    return angular.toJson(vm.formData, true);
                }

                vm.recordDataJson = function()
                {
                    return angular.toJson(vm.recordData, true);
                }

                vm.loadFormValues = function() 
                {
                    vm.status = "getFieldDescribe\n";
                    remoting.invokeAction(remoteActions.getFieldDescribe, function(result, event)
                    {            
                        vm.status += event.status + " " +  (event.message || "");
                        if (event.status && result)
                        {
                            vm.fieldDescriptions = result;
                            vm.buildProperties(result);
                        }
                        $scope.$apply();
                    },
                    { buffer: true, escape: false, timeout: 30000 });

                    vm.status = "loadFormValues\n";
                    remoting.invokeAction(remoteActions.loadForm, vm.recordId, function(result, event)
                    {            
                        vm.status += event.status + " " +  (event.message || "");
                        if (event.status && result)
                        {
                            vm.recordData = result;
                            angular.extend(vm.formData, vm.recordData);
                        }
                        $scope.$apply();
                    },
                    { buffer: true, escape: false, timeout: 30000 });
                }

                vm.saveForm = function() 
                {
                    vm.status = "saveForm\n";
                    if(!vm.isFormComplete()) return false;
                    remoting.invokeAction(remoteActions.saveForm, recordId, vm.formData, function(result, event)
                    {                              
                        vm.status += angular.toJson(event, true);
                        $scope.$apply();
                    },
                    { buffer: true, escape: false, timeout: 30000 });
                }

                //on startup
                vm.loadFormValues();

            }         
        };
    });
};
