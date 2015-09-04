module.exports = function (ngModule) {
ngModule.directive('cmTopBar', function () {
    return {
        restrict: 'E',
        scope: {
            customMetadataObjects : '=',
            selectedObject: '=',
            selectedField: '=',
            selectedRecord: '=',
            deploymentStatus: '=',
            saveChanges: '=',
            orgData: '=',
            rebuildAllData: '='
        },
        template: require('./topbar.html'),
        controllerAs: 'vm',
        replace: true,
        bindToController: true,
        controller: function ($log) {

            var vm = this;

            vm.deploymentStatus.state = 'clean';
            vm.deploymentStatus.stateDetails = '';


            vm.addNewField = function(){



                var newField = {
                                    fullName: 'new_field' + (vm.selectedObject.fields.length + 1) + '__c',
                                    label: 'New Field',
                                    length: '255',
                                    defaultValue:'true',
                                    precision:'12',
                                    scale:'0',
                                    type:'Text',
                                    value:'0',
                                    required: 'false',
                                    unique: 'false',
                                    externalId: 'false'
                                };

                vm.selectedObject.fields.unshift(newField);

                vm.selectedField = vm.selectedObject.fields[0];

            };

            vm.addNewObject = function () {

                var newObject = {
                                name: 'new_object' + (vm.customMetadataObjects.length + 1),
                                label: 'New Object'+ (vm.customMetadataObjects.length + 1),
                                pluralLabel: 'New Object'+ (vm.customMetadataObjects.length + 1) +'s',
                                fields: [
                                           /* {
                                                fullName: 'new_field__c',
                                                label: 'New Field',
                                                length: '255',
                                                defaultValue:'true',
                                                precision:'12',
                                                scale:'0',
                                                type:'Text',
                                                value:'0',
                                                required: 'false',
                                                unique: 'false',
                                                externalId: 'false'
                                            }*/
                                        ],
                                records: [
                                            /*{
                                                name: 'Default',
                                                label: 'Default values',
                                                description: 'Values for new object',
                                                values: [
                                                            {
                                                                value: '0',
                                                                name: 'new_field__c',
                                                                type: 'string'
                                                            }
                                                        ]
                                            }*/
                                        ]

                                };



                vm.customMetadataObjects.unshift(newObject);

                vm.selectedObject = vm.customMetadataObjects[0];
                vm.selectedField = vm.selectedObject.fields[0];
                vm.selectedRecord = vm.selectedObject.records[0]; 

            };

            vm.addNewRecord = function () {

                var newRecord = {
                                    name: 'new_record' + (vm.selectedObject.records.length + 1 || '') +'',
                                    label: 'New record' + (vm.selectedObject.records.length + 1 || '') + ' for ' + + vm.selectedObject.name + '',
                                    description: 'Values for ' + vm.selectedObject.name + '',
                                    values: []
                                };

                for(var f=0; f < vm.selectedObject.fields.length; f++){

                    var field = {};
                                field.value = '0';
                                field.name = vm.selectedObject.fields[f].fullName;
                                field.type = vm.selectedObject.fields[f].type;

                    newRecord.values.push(field);

                }

                vm.selectedObject.records.unshift(newRecord);
                vm.selectedRecord = vm.selectedObject.records[0];  

            };

        }

    };   

});
};