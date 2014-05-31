/*
The index.js page is your entry point for your javascript
module system.  Pulling external modules from the `node_modules`
folder.
*/
require('angular/angular');
require('angular-ui-router/release/angular-ui-router');
require('angular-sanitize/angular-sanitize');
require('angular-growl/build/angular-growl');


angular.module('todolists', ['ui.router', 'angular-growl'
/* add your application modules here */
])
  .controller('AppCtrl', function($scope, $rootScope) {
    $rootScope.title = 'Start Here';
  });
