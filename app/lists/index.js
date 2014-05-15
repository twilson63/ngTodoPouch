module.exports = angular.module('lists', [])
.config(['$stateProvider', require('./list-config')])
.factory('$todoSvc', ['$db', require('./services/todo-service')]);
