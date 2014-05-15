// splash is the detault home page for registration
module.exports = angular.module('splash', [])
.config(function($stateProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      controller: ['$scope', function ($scope) { }],
      template: require('./index.html')
    })
});
