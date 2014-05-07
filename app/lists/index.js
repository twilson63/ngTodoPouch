module.exports = angular.module('lists', [])
  .config(require('./list-config'))
  .factory('$todoSvc', require('./services/todo-service'));
