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
  return require('pouchdb')('myTodos');
})
;
