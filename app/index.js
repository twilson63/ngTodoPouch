require('angular-ui-router/release/angular-ui-router')
require('angular-sanitize/angular-sanitize');
require('angular-growl/build/angular-growl');

// register app module
angular.module('TodoApp', ['ui.router', 'ngSanitize', 'angular-growl',
  require('./splash').name,
  require('./account').name,
  require('./lists').name
])
// configure routes
.config(['$urlRouterProvider', '$httpProvider', require('./app-config')])
// add application controller
.controller('ApplicationCtrl', ['$scope', '$session', '$state', require('./app-controller')])
// map to pouchdb
.factory('$db', function() {
  return function (user) {
    return PouchDB(user + '_todos');
  }
  //var url = $window.location.origin + '/db/' + $window.localStorage.getItem('user');
})
// add underscore
.constant('$us', require('underscore'))
// add server origin
.factory('$origin',['$window', function($window) {
  return $window.location.origin;
}])
// add app session factory
.factory('$session', ['$db', '$http', '$origin', '$q', '$timeout',
  require('./app-session')
])
;
