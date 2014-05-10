module.exports = angular.module('account', [])
  .config(['$stateProvider', require('./account-config')])
  .factory('$accountSvc', ['$http', require('./services/account-service')]);
