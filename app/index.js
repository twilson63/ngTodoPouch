require('angular-ui-router/release/angular-ui-router')
require('angular-sanitize/angular-sanitize');
require('angular-growl/build/angular-growl');

angular.module('TodoApp', ['ui.router', 'ngSanitize', 'angular-growl',
  require('./splash').name,
  require('./account').name,
  require('./lists').name
])
.config(['$urlRouterProvider', '$httpProvider', require('./app-config')])
.controller('ApplicationCtrl', ['$scope', '$state', '$db',
  '$http', '$origin', require('./app-controller')])
.factory('$db', function() {
  return function (user) {
    return PouchDB(user + '_todos');
  }
  //var url = $window.location.origin + '/db/' + $window.localStorage.getItem('user');
})
.constant('$us', require('underscore'))
.factory('$origin',['$window', function($window) {
  return $window.location.origin;
}])
.factory('$session', ['$db', '$http', '$origin', '$q', '$timeout',
  require('./app-session')
])
;
