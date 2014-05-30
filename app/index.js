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
  .controller('AppCtrl', function($scope, $rootScope, $state) {
    $rootScope.title = 'TodoLists';
    $scope.$on('list:created', function(e, list) {
      $state.go('todolists.list');
    });
    $scope.$on('list:updated', function(e, list) {
      $state.go('todolists.list');
    });

  })
  .constant('underscore', require('underscore'))
  .factory('pouch', function() {
    return PouchDB('todolists');
  });
