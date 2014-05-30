module.exports = angular.module('app.todolists', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('todolists', {
        url: '/todolists',
        abstract: true,
        template: "<div ui-view></div>"
      })
      .state('todolists.list', {
        url: '/',
        controller: function () {},
        template: require('./list/todolist-list.html')
      });
   });
