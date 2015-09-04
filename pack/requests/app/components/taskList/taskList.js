module.exports = function (ngModule) {
    ngModule.directive('taskList', function () {
        return {
            restrict: 'E',
            scope: {},
            template: require('./taskList.html'),
            controllerAs: 'vm',
            replace: true,
            controller: function ($scope, $ocModal)
            {   
                var remoting = Visualforce.remoting.Manager;
                var partnerControllerMapper = window.partnerControllerMapper.remoteActions;
                var requestControllerMapper = window.requestControllerMapper.remoteActions;

                var vm = this; 

                remoting.invokeAction(requestControllerMapper.getRequestsByStatus, null, 
                    function(result, event) {
                        if (result != null && result.length > 0){
                            vm.tasks = result;
                        }
                        /*else{
                            var mockResults = [
                                {
                                    id: "123456",
                                    requestorId: "123456",
                                    globalId: "123412345656",
                                    requestorName: "Driscoll Farms",
                                    createdDate: "July 16, 2015  10:03 am",
                                    requestType: "Audit",
                                    requestStatus: "New",
                                    comments: "Our records indicate we are missing a copy of your CA transparency form for 2015. Please complete the attached forms.",
                                    attachments: "CA Transparency_Supply_Chain_2015",
                                    dueDate: "06/30/2015"
                                },
                                {
                                    id: "123457",
                                    requestorId: "0011a000006oshvAAA",
                                    globalId: "123458",
                                    requestorName: "Leafy Greens",
                                    createdDate: "July 08, 2015  10:14 pm",
                                    requestType: "Partnership",
                                    requestStatus: "New",
                                    comments: "Our records indicate we are missing a copy of your CA transparency form for 2015. Please complete the attached forms.",
                                    attachments: "CA Transparency_Supply_Chain_2015",
                                    dueDate: "06/30/2015"
                                },
                                {
                                    id: "123458",
                                    requestorId: "0011a000006oshvAAA",
                                    globalId: "123458",
                                    requestorName: "Rainbow baking",
                                    createdDate: "July 06, 2015  08:54 am",
                                    requestType: "Product Spec",
                                    requestStatus: "In progress",
                                    comments: null,
                                    attachments: null,
                                    dueDate: null
                                },
                                {
                                    id: "123459",
                                    requestorId: "0011a000006oshvAAA",
                                    globalId: "123459",
                                    requestorName: "Leafy Greens",
                                    createdDate: "July 08, 2015  10:14 pm",
                                    requestType: "Form",
                                    requestStatus: "New",
                                    comments: "Our records indicate we are missing a copy of your CA transparency form for 2015. Please complete the attached forms.",
                                    attachments: "CA Transparency_Supply_Chain_2015",
                                    dueDate: "06/30/2015"
                                }
                            ];
                            vm.tasks = mockResults;
                        }*/

                        vm.tasks.newRequests = vm.tasks.filter(function(item) { return item.isNew == true}).length;

                        $scope.$digest();              
                    }
                );

                vm.removeTask = function(taskList, task)
                {
                    for(var i = vm.tasks.length; i--;) {
                        if(vm.tasks[i] === task) {
                            vm.tasks.splice(i, 1);
                            return
                        }
                    }
                }

                vm.openRejectDialog = function(task){
                    $ocModal.open({
                        template: require('./connectionRejectModal.html'),
                        init: {
                            vm : vm,
                            task: task
                        }
                    });
                };

                vm.closeRejectDialog = function(task){
                    $ocModal.close();
                };

                vm.accept = function(task){
                    vm.closeRejectDialog()

                    if (task.requestType == 'Partnership'){
                        var isReciprocal = task.isReciprocal == undefined ? false : task.isReciprocal;
                        remoting.invokeAction(partnerControllerMapper.approvePartnership, task.id, isReciprocal,
                        function(result, event) {
                            vm.removeTask(vm.tasks, task);

                            $scope.$digest();
                        })
                    }else{ 
                        remoting.invokeAction(requestControllerMapper.approveRequest, task.id,
                        function(result, event) {
                            vm.removeTask(vm.tasks, task);

                            $scope.$digest();
                        })
                    }
                };

                vm.reject = function(task){
                    vm.closeRejectDialog()

                    remoting.invokeAction(requestControllerMapper.rejectRequest, task.id,
                    function(result, event) {
                        vm.removeTask(vm.tasks, task);
                        
                        $scope.$digest();
                    })
                };
             } 
        };

    });
};