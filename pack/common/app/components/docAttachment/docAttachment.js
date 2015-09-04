module.exports = function (ngModule) 
{
    //if( ON_TEST ) {require('./docAttachment.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('docAttachment', function () 
    {
        return {
            scope: {    
                        showList: '=',
                        dialogTitle: '=',
                        selectedAttachments: '='

                    },
            template: require('./docAttachment.html'),
            controllerAs: 'vm',
            replace: true,
            bindToController: true,
            controller: function (){

                var vm = this; 
                vm.targetDocumentTypes = ["Audits", "Data / Questionnaire", "Certificates", "Product Specifications", "Incident / Claims", "Recalls"];
                vm.targetDocuments = {
                                        "Audits": ["Supply Chain Audit 2015", "Facility Audit 2015", "HR Audit 2015"],
                                        "Data / Questionnaire": ["CA Transparency Supply Chain 2015"],
                                        "Certificates": [ "CA Transparency Supply Chain 2015"],
                                        "Product Specifications": [ "Walmart Standard Food Product Specifications", "Walmart Non-food product"],
                                        "Incident / Claims": ["Hasbro Incident", "Mattel Incident"],
                                        "Recalls": ["CA Food recall", "CA Non-food recall"],
                                    };
                vm.selectedType = null;


                vm.open = function(){
                    vm.showList.value = true;
                    vm.selectedType = null;
                };

                vm.close = function(){
                    vm.showList.value = false;
                };

                vm.selectDocType = function(docType){
                    vm.selectedType = docType;
                    if(docType){
                        vm.documentList = vm.targetDocuments[docType];
                    }
                };

               vm.getSelection = function(){

                    var sel=[];

                    for (var key in vm.selectedDocs){
                        console.log('from getSelection',vm.selectedDocs[key] );
                        if(vm.selectedDocs[key]){
                            sel.push(key);
                        }
                    }

                    return sel;

                };

                vm.back = function(){
                    vm.selectedType = null;
                    vm.documentList = null;
                };
                
                vm.attach = function(){

                    vm.selectedAttachments = vm.getSelection();
                    console.log('from attach', vm.selectedAttachments);
                    vm.close();
                };
            } 
        };
    });
};