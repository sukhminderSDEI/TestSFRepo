module.exports = function (ngModule) {
    if( ON_TEST ) {require('./autoComplete.test')(ngModule)} //ON_TEST IS A Node process varible that is set on build.
    ngModule.directive('autoComplete', function () {
        return {
            restrict: 'E',
            scope: {
                recipients: '=',
                search: '='
            },
            template: require('./autoComplete.html'),
            controllerAs: 'vm',
            replace: true,
            bindToController: true,
            controller: function () {

                var vm = this;

                vm.showResults =  false;
                vm.searchTerm = {value:''};

                // value must be reset on each search
                vm.disabledCount = 0;

                vm.baseImageUrl = staticBootstrapURL;

                vm.selectedItems = [];

                vm.addToSelection = function(index){

                     vm.selectedItems.push(vm.recipients[index]);
                     vm.recipients[index].disabled = true;

                    // add to the disabled count
                    // if this reach the length of the results array
                    // then all result are selected - do not show
                    vm.disabledCount++;

                };

                vm.processBlur = function(event){

                    // only hide the results if focus is taken to an element outside the auto complete dom
                    if(event.relatedTarget === null){

                        vm.showResults = false;

                    }else if(event.relatedTarget.className === null){

                        vm.showResults = false;

                    }else if (event.relatedTarget.className.indexOf('stay-open') === -1){

                        vm.showResults = false;

                    }

                };

                vm.resetDisabled = function(id){

                    for(var r = 0; r < vm.recipients.length; r++){
                        if(vm.recipients[r].id === id && typeof vm.recipients[r].disabled !== 'undefined'){
                            vm.recipients[r].disabled = false;
                            vm.disabledCount--;
                        }
                    }

                };

                /*vm.recipients = [
                                {
                                    name: 'Con Agra Foods',
                                    id: 'sdfaefaefada',
                                    logoUrl:staticBootstrapURL + '/images/Conagrap.jpg',
                                    status:'compliant',
                                    address:'161 N. Concord Exchange, St. Paul, MN 55164'
                                },
                                {
                                    name: 'Dean Foods',
                                    id: 'gfwegfwqefkggg',
                                    logoUrl:staticBootstrapURL + '/images/Dean_foods.jpg',
                                    status:'noncompliant',
                                    address:'P.O. Box 961447,El Paso, TX 79996'
                                },
                                {
                                    name: 'ICIX',
                                    id: 'asvdwevwghevew',
                                    logoUrl:staticBootstrapURL + '/images/icix.jpg',
                                    status:'compliant',
                                    address:'One Tower Place, Suite 300, San Francisco, CA 94080'
                                },
                                {
                                    name: 'Tyson',
                                    id: 'wefwefaweghkfw',
                                    logoUrl:staticBootstrapURL + '/images/Tyson.gif',
                                    status:'noncompliant',
                                    address:'2200 W Don Tyson Pkwy, Springdale, AR 72762'
                                },
                                {
                                    name: 'Rallys',
                                    id: 'wefwefaweghkefw',
                                    logoUrl:staticBootstrapURL + '/images/Raleys.gif',
                                    status:'compliant',
                                    address:'4300 West Cypress St. Suite 600, Tampa, FL'
                                },
                                {
                                    name: 'Walmart',
                                    id: 'asefsefsegdxcefew',
                                    logoUrl:staticBootstrapURL+ '/images/Walmart.jpg',
                                    status:'compliant',
                                    address:'702 SW 8th St, Bentonville, AR 72716'
                                }
                            ];
*/
                

            },
            link: function(scope, element) {

                    /*if(targetIsAutocomplete !== true){
 
                        window.setTimeout(function() {
                            document.getElementsByName("results")[0].focus();
                        }, 60);

                    }*/
                  
                //};
                scope.focusOnInput = function(){

                    document.getElementsByName("searchInput")[0].focus();

                }

                scope.searchOnKeyUp = function(){


                    scope.vm.search(document.getElementsByName("searchInput")[0].value);
                   

                };
                    
            }

        };

    });
};