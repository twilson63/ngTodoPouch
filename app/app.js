angular.module('Todo', ['angular-pouch'])
  .config(function($routeProvider, $locationProvider) {
    'use strict';
    
    $routeProvider
      .when('/', { 
        controller: 'MainCtrl', 
        templateUrl: '/app/templates/main.html'
      });
    $locationProvider.html5Mode(true);
  })
  ;