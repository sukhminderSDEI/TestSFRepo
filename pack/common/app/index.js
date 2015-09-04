'use strict';
var angular = require('angular');
require('angular-bootstrap');

if (ON_TEST) { require('angular-mocks'); configSettings = {}; configSettings.baseName = ''; } //ON_TEST IS A Node process varible that is set on build. 
  
if (IS_LOCAL) { configSettings = {}; configSettings.baseName = ''; } //IS_LOCAL IS A Node process varible that is set on build.

// define a generic angular module
// pass the generic module reference to all required components and controllers.
var ngModule = angular.module('common', ['ui.bootstrap']);

//global componets
require('./components/navBar')(ngModule);
require('./components/toolbar')(ngModule);
require('./components/toolbar/newRequest')(ngModule);
require('./components/docAttachment')(ngModule);
require('./components/autoComplete')(ngModule);
require('./components/ocModal')(ngModule)
require('./components/objectForm')(ngModule);
// todo needs work.
/*require('./components/tooltip')(ngModule);*/