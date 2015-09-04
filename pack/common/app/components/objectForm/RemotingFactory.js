module.exports = function (ngModule) 
{
    ngModule.factory('RemotingFactory', ['$q', function ($q) 
    {
        return function(/*params*/) 
        {
            var deferred = $q.defer();
            Visualforce.remoting.Manager.invokeAction(
       /*global refernce to js remote*/,/*params*/,
           function(result, event) 
           {
                   if (event.status)
                       deferred.resolve(result);
                   else
                       deferred.reject(event);
           },
           { buffer: true, escape: false, timeout: 30000 });

            return deferred.promise;
        }
    }]);
};