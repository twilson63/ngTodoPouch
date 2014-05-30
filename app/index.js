require('angular/angular');
require('angular-ui-router/release/angular-ui-router');
require('angular-sanitize/angular-sanitize');
require('angular-growl/build/angular-growl');

angular.module('todolists', ['ui.router', 'angular-growl',
  require('./todolists').name
])
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/todolists/');
  })
  .controller('AppCtrl', function($scope, $rootScope) {
    $rootScope.title = 'TodoLists';
  });
