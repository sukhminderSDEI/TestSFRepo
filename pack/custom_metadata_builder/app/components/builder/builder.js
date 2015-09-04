require('node-zip');
var jsforce = require('jsforce'),
    parseString = require('xml2js').parseString;


module.exports = function (ngModule) {
    ngModule.directive('cmBuilder', function () {

        return {
            restrict: 'E',
            scope: {},
            template: require('./builder.html'),
            replace: true,
            controllerAs: 'vm',
            controller: function ($log, $q, ExistingCustomMetadataObjectsFactory,SaveAndDeployFactory,$timeout,$http) {
                
                var vm = this; 

                //toDo                                        
                vm.orgData = {

                    namspace: configSettings.config.nameSpace,
                    packages: 'unpackaged'

                };

                $log.info('namespace', configSettings.config.nameSpace);


                // used with the topbar and work space module.
                vm.deploymentStatus = { state: 'clean'};
                
                // a temporary object used between loading.
                vm.existingCustomMetadataObjects = [{
                                                        name: 'Loading...',
                                                        label: 'Loading...',
                                                        pluralLabel: '',
                                                        fields: [
                                                                    {
                                                                        fullName: 'Loading...',
                                                                        label: 'Loading...',
                                                                        length: '',
                                                                        defaultValue:'',
                                                                        precision:'',
                                                                        scale:'',
                                                                        type:'',
                                                                        value:''
                                                                    }
                                                                ],
                                                        records : [

                                                                    {
                                                                        name: 'Loading...',

                                                                    }
                                                        ]

                                                    }];

                // is called on init and on succes of deploy
                vm.rebuildAllData = function(){

                    ExistingCustomMetadataObjectsFactory(vm).then(function(result){

                        $log.info('existing results: ', result);
                        vm.existingCustomMetadataObjects = result;
                        vm.selectedObject = vm.existingCustomMetadataObjects[0];
                        vm.selectedField = vm.selectedObject.fields[0];
                        vm.selectedRecord = vm.selectedObject.records[0];
                        vm.deploymentStatus.state = 'clean';

                    });

                };

                // setup and first time init of the page.
                // selected-object bound to the sidebar....
                // used to populate the fields for the info section and object name for workspace
                vm.selectedObject = vm.existingCustomMetadataObjects[0];
                vm.selectedField = vm.selectedObject.fields[0];
                vm.selectedRecord = vm.selectedObject.records[0];
                vm.rebuildAllData();

                vm.saveChanges = function(){

                    vm.deploymentStatus.state = 'saving';

                    SaveAndDeployFactory(vm).then(function(result){

                        $log.info('result', result);
                        vm.rebuildAllData();

                    });

                    $log.info('Save Changes Fired');

                };

            }// end of controller requestInstalledPackages
        
        };

    }).factory('ExistingCustomMetadataObjectsFactory', ['$q', '$rootScope', '$log', '$timeout',function ($q, $rootScope, $log, $timeout) {
    return function(vm) {
        var deferred = $q.defer();
                //$rootScope.$apply(function() {

                    var existingCustomMetadataObjects = [];
                    var cmToCustomObjectMapper = {};

                    var defualtPackage = {
                        version: 33,
                        types: [

                                    {
                                        members: '*',
                                        name: 'CustomMetadata'
                                    },
                                    {
                                        members: '*',
                                        name: 'CustomObject'
                                    }
                                ]
                        };


                    // establish the connection with the session token
                    var conn = new jsforce.Connection({ accessToken: configSettings.config.apiSession });

                    var retrieveOptions = {};
                    retrieveOptions.apiVersion = 33;
                    if(vm.orgData.packages === 'unpackaged'){
                        retrieveOptions.unpackaged = defualtPackage;
                    }else{ 
                        retrieveOptions.packageNames = [];
                        retrieveOptions.packageNames.push(vm.orgData.packages);
                    }


                    // make the make the first request for the existing custom meta data and objects
                    // TODO: setup to work with package names....
                    conn.metadata.retrieve(retrieveOptions, function (err, result){ checkForResults(result.id); });

                    // continue to poll the metadata api for the result every 1000 ms
                    function checkForResults(requestId){

                        $timeout(function(){ 

                            conn.metadata.checkRetrieveStatus(requestId,function(err, myResult){

                                // if status is not done contiue to poll..
                                if(myResult.status === 'Pending' || myResult.status === 'InProgress'){

                                    checkForResults(requestId);

                                }else{
                               
                                    var zip = new JSZip();
                                   
                                    // load the zip into memory
                                    zip.load(myResult.zipFile,{base64:true});
                                    //check for any exsisting custom object with custom metadatatypes
                                    $log.info(zip);
                                    $log.info('num of object keys', Object.keys(zip.files).length);
                                    if(Object.keys(zip.files).length > 1){

                                        proccessXML(zip);

                                    } else {

                                        vm.existingCustomMetadataObjects = [{
                                                        name: 'new_object',
                                                        label: 'New Object',
                                                        pluralLabel: 'New Objects',
                                                        fields: [
                                                                    {
                                                                        fullName: 'new_field__c',
                                                                        label: 'New Field',
                                                                        length: '255',
                                                                        defaultValue:'',
                                                                        precision:'',
                                                                        scale:'',
                                                                        type:'Text',
                                                                        value:'0',
                                                                        required: 'false',
                                                                        unique: 'false',
                                                                        externalId: 'false'
                                                                    }
                                                                ],
                                                                records: [
                                                                            {
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
                                                                            }
                                                                        ]

                                

                                                    }]; 

                                        vm.selectedObject = vm.existingCustomMetadataObjects[0];
                                        vm.selectedField = vm.selectedObject.fields[0];
                                        vm.selectedRecord = vm.selectedObject.records[0]; 

                                    }
                                }

                            });

                        }, 1000);

                    }

                    function setDefault(){

                        vm.existingCustomMetadataObjects = [{
                                                        name: 'new_object',
                                                        label: 'New Object',
                                                        pluralLabel: 'New Objects',
                                                        fields: [
                                                                    {
                                                                        fullName: 'new_field__c',
                                                                        label: 'New Field',
                                                                        length: '255',
                                                                        defaultValue:'',
                                                                        precision:'',
                                                                        scale:'',
                                                                        type:'Text',
                                                                        value:'0',
                                                                        required: 'false',
                                                                        unique: 'false',
                                                                        externalId: 'false'
                                                                    }
                                                                ],
                                                                records: [
                                                                            {
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
                                                                            }
                                                                        ]

                                

                                                    }]; 

                                        vm.selectedObject = vm.existingCustomMetadataObjects[0];
                                        vm.selectedField = vm.selectedObject.fields[0];
                                        vm.selectedRecord = vm.selectedObject.records[0]; 

                    }

                    // take the zip data in memory and map the custom objects and metadata types togather
                    // group by their common fullname
                    function proccessXML(zipResults){

                        for (var key in zipResults.files) {

                            if( zipResults.files.hasOwnProperty(key) ) {

                                // filter for custom meta data objects
                                if(key.indexOf('__mdt') !== -1){

                                    var objectName = key.substring((key.lastIndexOf('/') + 1),key.indexOf('__mdt'));
                                    
                                    if(cmToCustomObjectMapper.hasOwnProperty(objectName) === false){
                                        cmToCustomObjectMapper[objectName] = {};
                                    }

                                    cmToCustomObjectMapper[objectName].customObjectAsText = zipResults.file(key).asText();
                                    $log.info(cmToCustomObjectMapper[objectName].customObjectAsText = zipResults.file(key).asText());
                                    cmToCustomObjectMapper[objectName].qualifiedName = objectName;
                                }

                                // filter for custom metadata types
                                if(key.indexOf('.md') !== -1){

                                    // get the objectName and the record instance name form the key
                                    var objectName = key.substring((key.lastIndexOf('/') + 1),key.indexOf('.'));
                                    var recordInstance = key.substring((key.indexOf('.') + 1),key.indexOf('.md'));

                                    $log.info('The record instance name', recordInstance);

                                    // allways check for the existance of the  object name as key first.
                                    if(cmToCustomObjectMapper.hasOwnProperty(objectName) === false){
                                        cmToCustomObjectMapper[objectName] = {};
                                    }

                                    // again check for the existance of the customMetaDataAsText name as key first.
                                    if(cmToCustomObjectMapper[objectName].hasOwnProperty('customMetaDataAsText') === false){
                                        cmToCustomObjectMapper[objectName].customMetaDataAsText = {};
                                    }

                                    cmToCustomObjectMapper[objectName].customMetaDataAsText[recordInstance] = zipResults.file(key).asText();

                                    $log.info(cmToCustomObjectMapper[objectName].customMetaDataAsText[recordInstance]);
                                }

                                
                                // output the contents of the package.xml for dev...
                                if(key.indexOf('package.xml') !== -1){
                                    $log.info(zipResults.file(key).asText());
                                }
                                

                            }
                    
                        }


                        $log.info('object keys', Object.keys(cmToCustomObjectMapper).length );
                        // if no cm types are found set the default
                        if(Object.keys(cmToCustomObjectMapper).length === 0){
                            setDefault();
                        }

                        // once the mapping is complete
                        // use the xml parser to convert the strings to objects
                        // call the merge method to complete the transistion to the required object pattern
                        for(var key in cmToCustomObjectMapper){

                            $log.info('cmToCustomObjectMapper', cmToCustomObjectMapper[key]);
 
                            var xml = cmToCustomObjectMapper[key].customObjectAsText;
                            parseString(xml,{ignoreAttrs: true}, function (err, result) {
                                cmToCustomObjectMapper[key].customObject = result.CustomObject;
                            });


                            for(var rKey in cmToCustomObjectMapper[key].customMetaDataAsText){

                                if(cmToCustomObjectMapper[key].hasOwnProperty('customMetaData') === false){
                                    cmToCustomObjectMapper[key].customMetaData = {};
                                }

                                var rXml = cmToCustomObjectMapper[key].customMetaDataAsText[rKey]; 
                                parseString(rXml,{ignoreAttrs: true, trim: true},  function (err, result) {

                                    cmToCustomObjectMapper[key].customMetaData[rKey] = result.CustomMetadata;
                                
                                });

                            }

                            
                            mergeMetaDataToCustomObject(cmToCustomObjectMapper[key]);

                        }

                    }

                    // completes the merge process and builds out the existingCustomMetadataObjects used by the main model 
                    function mergeMetaDataToCustomObject(customMetaDataObjectMap){

                        $log.info('incoming customMetadataObject', customMetaDataObjectMap);

                        var mergedCustomObject = {
                                                    name: customMetaDataObjectMap.qualifiedName,
                                                    label: customMetaDataObjectMap.customObject.label[0],
                                                    pluralLabel: customMetaDataObjectMap.customObject.pluralLabel[0],
                                                    fields:[],
                                                    records:[]
                                                };


                            for(var rKey in customMetaDataObjectMap.customMetaData){

                                var record = {};
                                record.name = rKey;
                                record.description = customMetaDataObjectMap.customMetaData[rKey].description[0];
                                record.label = customMetaDataObjectMap.customMetaData[rKey].label[0];
                                record.values = [];
                                for(var v=0; v < customMetaDataObjectMap.customMetaData[rKey].values.length; v++){

                                    var field = {};
                                    field.value = customMetaDataObjectMap.customMetaData[rKey].values[v].value[0];
                                    field.name = customMetaDataObjectMap.customMetaData[rKey].values[v].field[0];
                                    field.type = customMetaDataObjectMap.customObject.fields[v].type[0];

                                    record.values.push(field);

                                }


                                mergedCustomObject.records.push(record);

                            }

                        // merge the fields with the values of the custom metadata type
                        // the custom object and metaData are paired by common fullname
                        // both the fields and values arrays have matching order and length
                        for(var f=0; f < customMetaDataObjectMap.customObject.fields.length; f++){

                            var incomingField = customMetaDataObjectMap.customObject.fields[f];
                            //var incomingValue = customMetaDataObjectMap.customMetaData.values[f];
                            
                            var field = {};
                            field.fullName = incomingField.fullName[0];
                            field.label = incomingField.label[0];
                            if(typeof incomingField.length !== 'undefined'){ field.length = incomingField.length[0]; }
                            //field.value = incomingValue.value[0];
                            if(typeof incomingField.defaultValue !== 'undefined'){ field.defaultValue = incomingField.defaultValue[0]; }
                            if(typeof incomingField.precision !== 'undefined'){ field.precision = incomingField.precision[0]; }
                            if(typeof incomingField.scale !== 'undefined'){ field.scale = incomingField.scale[0]; }
                            if(typeof incomingField.unique !== 'undefined'){ field.unique = incomingField.unique[0]; }
                            if(typeof incomingField.required !== 'undefined'){ field.required = incomingField.required[0]; }
                            if(typeof incomingField.externalId !== 'undefined'){ field.externalId = incomingField.externalId[0]; }
                            field.type = incomingField.type[0];

                            mergedCustomObject.fields.push(field);

                        }

                        // this defines the existing list of custom objects.
                        existingCustomMetadataObjects.push(mergedCustomObject);

                        if (existingCustomMetadataObjects.length === Object.keys(cmToCustomObjectMapper).length) {

                            resolveHelper(existingCustomMetadataObjects)
                            $log.info('existingCustomMetadataObjects',existingCustomMetadataObjects );

                        }

                    }

            function resolveHelper(existingCustomMetadataObjects){

                return deferred.resolve(existingCustomMetadataObjects);

            }

            return deferred.promise;
            
         }
    }]).factory('SaveAndDeployFactory', ['$q', '$log', function ($q, $log) {
    return function(vm) {
        var deferred = $q.defer();

            var customMetadataObjectTypes = vm.existingCustomMetadataObjects;
            
            // prepare for zipping.....
            var zip = new JSZip();

            // create the package.xml file and add it the archive
            var packageXml = buildPackageXml(vm.orgData.packages);
            zip.file( vm.orgData.packages + '/package.xml', packageXml, {createFolders: true});

            $log.info(packageXml);

            // loop through all the object in the main array... 
            // process them into the required custom object and metadata type xml files.
            for(var o=0; o < customMetadataObjectTypes.length; o++){

                cmObjectType = customMetadataObjectTypes[o];

                var customObjectXml = customObjectToXml(vm.orgData.namspace, cmObjectType);

                $log.info('test customObject', customObjectXml);
                
                zip.file( vm.orgData.packages + '/objects/' + cmObjectType.name + '__mdt.object', customObjectXml, {createFolders: true});

                for(var r=0; r < cmObjectType.records.length; r++){

                        var customMetadataXml = customMetadataToXml(vm.orgData.namspace, cmObjectType.records[r], cmObjectType.fields);
                        zip.file( vm.orgData.packages + '/customMetadata/' + cmObjectType.name + '.' + cmObjectType.records[r].name + '.md', customMetadataXml, {createFolders: true});
                        $log.info('test customMetaDat', customMetadataXml);

                }
                
            }
           
            $log.info('zip payload pre compression', zip);
            var zipData = zip.generate({base64: true, compression: 'DEFLATE'});

            var conn = new jsforce.Connection({ accessToken: configSettings.config.apiSession });

            conn.metadata.deploy(zipData, {allowMissingFiles: true } )
                .complete(function(err, result) {
                    if (err) { console.log(err); }
                    $log.info('result from deploy', result)
                if (typeof err !== 'undefined' && result.status === 'Succeeded') {
                    deferred.resolve(result);
                } else {
                    deferred.reject(err);
                }
            });


            // builds the string for the package.xml
            function buildPackageXml(packageName) {

                var packageXml  =       '<?xml version="1.0" encoding="UTF-8"?>';
                    packageXml  +=      '<Package xmlns="http://soap.sforce.com/2006/04/metadata">';
                    packageXml  +=      (packageName !== 'unpackaged') ? '<fullName>'+ packageName +'</fullName>' : '';
                    packageXml  +=          '<types>';
                    packageXml  +=              '<members>*</members>';
                    packageXml  +=              '<name>CustomObject</name>';
                    packageXml  +=          '</types>';
                    packageXml  +=          '<types>';
                    packageXml  +=              '<members>*</members>';
                    packageXml  +=              '<name>CustomMetadata</name>';
                    packageXml  +=          '</types>';
                    packageXml  +=          '<version>33.0</version>';
                    packageXml  +=      '</Package>';

                return packageXml;

            }


            // builds the string for the custom object xml
            function customObjectToXml(namespace,inputData) {

                        var ns = (namespace !== '' && vm.orgData.packages !== 'unpackeged') ? namespace : '';

                        var customObjectXml =     '<?xml version="1.0" encoding="UTF-8"?>';
                            customObjectXml +=    '<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">';
                            
                            for (var c=0; c < inputData.fields.length; c++){

                                var field = inputData.fields[c]

                                // TODO: build out for Email, Phone, URL, Date, Date/Time
                                customObjectXml +=    '<fields>';

                                customObjectXml +=        '<fullName>' + ns + field.fullName + '</fullName>';
                                customObjectXml +=        '<label>'+ field.label + '</label>';
                                customObjectXml +=        (field.type === 'Text' || field.type === 'TextArea') ? '<length>'+ (field.length || 255) + '</length>' : '';
                                customObjectXml +=        (field.type === 'Checkbox') ? '<defaultValue>'+ field.defaultValue + '</defaultValue>' : '';
                                customObjectXml +=        (field.type === 'Number' || field.type === 'Percent' ) ? '<precision>'+ (field.precision || '12') + '</precision>' : '';
                                customObjectXml +=        (field.type === 'Number' || field.type === 'Percent') ? '<scale>'+ (field.scale || '0') + '</scale>' : '';
                                customObjectXml +=        '<type>'+ field.type + '</type>';
                                customObjectXml +=        '<externalId>'+ field.externalId + '</externalId>';
                                customObjectXml +=        '<required>'+ field.required + '</required>';
                                customObjectXml +=        '<unique>'+ field.unique + '</unique>';
                            
                                customObjectXml +=    '</fields>';

                            }

                            customObjectXml +=          '<label>' + inputData.label + '</label>';
                            customObjectXml +=          '<pluralLabel>' + inputData.pluralLabel + '</pluralLabel>';
                            customObjectXml +=    '</CustomObject>';

     
                        if (typeof inputData !== 'undefined' || inputData !== {}) {

                            return customObjectXml;

                        } else {

                            return '';
                        
                        }

            }

            // builds the string for the custom metadata type xml 
            function customMetadataToXml(namespace,inputData,fields) {

          
                var ns = (namespace !== '' && vm.orgData.packages !== 'unpackeged') ? namespace : '';

                var customMetadataXml =     '<?xml version="1.0" encoding="UTF-8"?>';
                    customMetadataXml +=    '<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">';
                    customMetadataXml +=    '<description>'+  inputData.description + '</description>';
                    customMetadataXml +=    '<label>' + inputData.label + '</label>';
                    
                    for (var c=0; c < inputData.values.length; c++){

                        var field = inputData.values[c];

                        customMetadataXml +=    '<values>';
                        customMetadataXml +=        '<field>' + ns + fields[c].fullName + '</field>';
                        customMetadataXml +=        '<value xsi:type="xsd:' + sfTypeToApexType(fields[c].type) + '">' + field.value + '</value>';
                        customMetadataXml +=    '</values>';

                    }

                    customMetadataXml +=    '</CustomMetadata>';


                if (typeof inputData !== 'undefined' || inputData !== {}) {

                    return customMetadataXml;

                } else {

                    return '';
                
                }
        
            } 

            // converts the sf field type into apex field type: 
            function sfTypeToApexType(input){

                var output = '';

                if(input === 'Text'){
                    return output = 'string';
                }else if(input === 'Number'){
                    return output = 'double';
                }if(input === 'Checkbox'){
                    return output = 'boolean';
                }if(input === 'TextArea'){
                    return output = 'string';
                };

            }

            return deferred.promise;
        }
}]);
};


/*// is called on init and on succes of deploy
                vm.rebuildAllData = function(){

                    ExistingCustomMetadataObjectsFactory(vm).then(function(result){

                        vm.existingCustomMetadataObjects = result;
                        vm.selectedObject = vm.existingCustomMetadataObjects[0];
                        vm.selectedField = vm.selectedObject.fields[0];
                        vm.deploymentStatus.state = 'clean';

                    });

                };*/