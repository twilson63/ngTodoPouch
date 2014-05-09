require('angular/angular');
require('angular-ui-router/release/angular-ui-router');

angular.module('TodoApp', ['ui.router',
  require('./splash').name,
  require('./account').name,
  require('./lists').name
])
.config(require('./app-config'))
.controller('ApplicationCtrl', require('./app-controller'))
.factory('$db', function() {
  //var url = $window.location.origin + '/db/' + $window.localStorage.getItem('user');
  return require('pouchdb')('myTodos');
})
.constant('$us', require('underscore'))
.factory('$origin', function($window) {
  return $window.location.origin;
})
.factory('$set', function($window) {
  return function (key, value) {
    $window.localStorage.setItem(key, value);
  };
})
.factory('$user', function ($window) {
  return $window.localStorage.getItem('user');
})

;
