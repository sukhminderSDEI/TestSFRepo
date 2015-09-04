'use strict';
if(typeof angular === 'undefined'){ var angular = require('angular');}

if (ON_TEST) { 
        require('angular-mocks');
        angular.module('common',[]); 
        configSettings = {}; 
        configSettings.baseName = ''; 
} //ON_TEST IS A Node process varible that is set on build. 
  
if (IS_LOCAL) { 
        configSettings = {}; 
        configSettings.baseName = ''; 
} //IS_LOCAL IS A Node process varible that is set on build.

// define a generic angular module
// pass the generic module reference to all required components and controllers.
var ngModule = angular.module('app', [require('angular-animate'),'common']);

// call all required components and controllers.
require('./components/main')(ngModule);
require('./components/taskList')(ngModule);


