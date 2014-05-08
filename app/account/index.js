module.exports = angular.module('account', [])
  .config(require('./account-config'))
  .factory('$accountSvc', require('./services/account-service'));
