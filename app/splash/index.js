module.exports = angular.module('splash', [])
.config(function($stateProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      controller: function ($scope) {

      },
      template: require('./index.html')
    })
});
