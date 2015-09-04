module.exports = function (ngModule) 
{
    ngModule.directive('question', function () 
    {
        return {
            scope: { vm: '=', prop: '='},
            template: require('./question.html'),
            controllerAs: 'qvm',
            bindToController: true,
            replace: true,
            controller: function ($scope)
            {
                var qvm = this; 
                window.qvm = qvm;
                qvm.property = function(key)
                {
                   return qvm.vm.properties[key];
                }

                qvm.getNested = function(val)
                {
                    var key = qvm.prop.key;
                    if(!qvm.vm.fieldDependencies[key].nested) return [];
                    return qvm.vm.fieldDependencies[key].nested[val] || [];
                }
            }    
        };
    });
};
