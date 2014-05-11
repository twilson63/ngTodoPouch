angular.module('TodoApp', ['ui.router',
  require('./splash').name,
  require('./account').name,
  require('./lists').name
])
.config(['$urlRouterProvider', '$httpProvider', require('./app-config')])
.controller('ApplicationCtrl', ['$scope', '$state', '$db',
  '$http', '$user', '$set', '$origin', require('./app-controller')])
.factory('$db', function() {
  //var url = $window.location.origin + '/db/' + $window.localStorage.getItem('user');
  return PouchDB('myTodos');
})
.constant('$us', require('underscore'))
.factory('$origin',['$window', function($window) {
  return $window.location.origin;
}])
.factory('$set', ['$window',function($window) {
  return function (key, value) {
    $window.localStorage.setItem(key, value);
  };
}])
.factory('$user', ['$window', function ($window) {
  return $window.localStorage.getItem('user');
}]);
