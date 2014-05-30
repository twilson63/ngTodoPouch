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
        controller: require('./list/todolist-list-controller'),
        template: require('./list/todolist-list.html')
      })
      .state('todolists.new', {
        url: '/new',
        controller: require('./new/todolist-new-controller'),
        template: require('./new/todolist-new.html')
      })
      .state('todolists.show', {
        url: '/:id',
        controller: require('./show/todolist-show-controller'),
        template: require('./show/todolist-show.html'),
        resolve: {
          list: function(todolistsDb, $stateParams) {
            return todolistsDb().$get($stateParams.id);
          },
          save: function(todolistsDb) {
            return function(list) {
              return todolistsDb().$put(list);
            };
          },
          remove: function(todolistsDb) {
            return function(list) {
              return todolistsDb().$remove(list);
            }
          }
        }
      });
   })
   .factory('todolistsDb', require('./services/todolist-db'));
