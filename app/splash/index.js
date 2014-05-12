module.exports = angular.module('splash', [])
.config(function($stateProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      controller: ['$scope', function ($scope, growl) {
      }],
      template: require('./index.html')
    })
});
