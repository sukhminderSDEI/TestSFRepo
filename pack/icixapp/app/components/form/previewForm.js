module.exports = function(ngModule){
    ngModule.directive('previewForm', function(){
        
        return {
            restrict: 'E',
            scope: {},
            template: require('./previewForm.html'),
            controllerAs: 'vm',
            controller: function() {
                var vm = this; // vm stands for "View Model" --> see https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
                  vm.user = {};

                  vm.userFields = [
                    {
                      // the key to be used in the model values
                      // so this will be bound to vm.user.username
                      key: 'username',
                      type: 'input',
                      templateOptions: {
                        label: 'Username',
                        placeholder: 'johndoe',
                        required: true,
                        description: 'Descriptive text'
                      }
                    },
                    {
                      key: 'password',
                      type: 'input',
                      templateOptions: {
                        type: 'password',
                        label: 'Password',
                        required: true
                      },
                      expressionProperties: {
                        'templateOptions.disabled': '!model.username' // disabled when username is blank
                      }
                    },
                    {
                      key: 'testDate',
                      type: 'input',
                      templateOptions: {
                        type: 'date',
                        label: 'Current Date',
                        required: true
                      },
                      expressionProperties: {
                        'templateOptions.disabled': '!model.username' // disabled when username is blank
                      }
                    }
                  ];
                  
                  vm.onSubmit = onSubmit;
                  
                  
                  function onSubmit() {
                    console.log('form submitted:', vm.user);
                  }
            }
        };

    });
};

