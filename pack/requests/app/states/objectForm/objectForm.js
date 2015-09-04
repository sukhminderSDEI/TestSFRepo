module.exports = function(ngModule)
{
    ngModule.controller('ObjectFormController', function ($scope, $log, $window) 
    {        
        $scope.recordId = $window.recordId;
        var remoting = Visualforce.remoting.Manager;
        var remoteActions = $window.configSettings.remoteActions;

        $scope.initModelData = $window.initModelData;
        $scope.initFormData = $window.initFormData;

        $scope.status="";
        $scope.formData = {};
        $scope.recordData = {};

		$scope.step=0;
        $window.actions = $scope.actions = $scope.initFormData ? $scope.initFormData.form[1].items : [];
		$scope.actions.push({"style": "btn-dangerformJson", "title": "Next" });
		$scope.actions.push({"style": "btn-dangerformJson", "title": "Prev" });

        $scope.buildProperties = function(map) 
        {
            var properties = [];
            for (var key in map)
            {
                var prop = map[key];
                //if(!prop.enum) continue;
                prop.key = key; 
                //$scope.formData[key] = '';
                properties.push(prop);
            }

            $scope.current = properties[0];
            return $window.props = properties;
        }

        $scope.isUpdateable = function(key)
        {
            return $scope.fieldDescriptions 
            && $scope.fieldDescriptions[key] 
            && $scope.fieldDescriptions[key].updateable;
        }

        $scope.isPicklist = function(key)
        {
            return $scope.fieldDescriptions 
            && $scope.fieldDescriptions[key] 
            && $scope.fieldDescriptions[key].type == "picklist";
        }

        $scope.formatValue = function(prop)
        {
            var value = $scope.formData[prop.name];
            if(prop.type == "date" || prop.type == "datetime")
                return new Date(parseInt(value)).toString();
            return value;
        }

        $scope.formDataJson = function()
        {
            return angular.toJson($scope.formData, true);
        }

        $scope.recordDataJson = function()
        {
            return angular.toJson($scope.recordData, true);
        }

        $scope.loadFormValues = function() 
        {
            $scope.status = "getFieldDescribe\n";
            remoting.invokeAction(remoteActions.getFieldDescribe, function(result, event)
            {            
                $scope.status += event.status + " " +  (event.message || "");
                if (event.status && result)
                {
                    $window.fieldDescriptions = $scope.fieldDescriptions = result;
                    $scope.properties = $scope.buildProperties(result);
//                    $scope.status += angular.toJson(event, true);
                }
                $scope.$apply();
            },
            {escape:true});

            $scope.status = "loadFormValues\n";
            remoting.invokeAction(remoteActions.loadForm, $scope.recordId, function(result, event)
            {            
                $scope.status += event.status + " " +  (event.message || "");
                if (event.status && result)
                {
                    $scope.recordData = result;
                    angular.extend($scope.formData, $scope.recordData);
                }
                $scope.$apply();
            },
            {escape:true});
        }

        $scope.saveForm = function() 
        {
            $scope.status = "saveForm\n";
            remoting.invokeAction(remoteActions.saveForm,
                recordId, 
                $scope.formData,
                function(result, event)
                {                              
                    $scope.status += angular.toJson(event, true);
                    $scope.$apply();
                },
                {escape:true}
            );
        }

        $scope.doAction = function(el)
        {
            $scope.status = el;
            if(el=='Load')
                return $scope.getFormValues();
            if(el=='Save')

            if(el=='Next' && $scope.step < $scope.properties.length-1)
                $scope.step++;
            else if(el=='Prev' && $scope.step>0)
                $scope.step--;
            $scope.current = $scope.properties[$scope.step];
        }

        $scope.loadFormValues();
    });
};