var angular = require('angular');

var ngModule = angular.module('app', [require('angular-formly'),require('angular-formly-templates-bootstrap')]);

require('./components/form')(ngModule);
require('./controllers')(ngModule);

