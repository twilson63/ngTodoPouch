angular.module('Todo', ['angular-pouch'])
  .config(function($routeProvider, $locationProvider) {
    'use strict';
    
    $routeProvider
      .when('/', { 
        controller: 'MainCtrl', 
        templateUrl: '/app/templates/main.html'
      });
    $locationProvider.html5Mode(true);
  })
  ;
angular.module('Todo')
  .factory('$db', function($pouch) {
    return $pouch('idb://todos');
  });

angular.module('Todo')
  .controller('MainCtrl', function($scope, $db) {
    'use strict';
    $scope.todos = [];

    $db.allDocs({include_docs: true}, function(err, response) {
      $scope.$apply(function() {
        response.rows.forEach(function(row) {
          $scope.todos.push(row.doc);
        });
      });
    });

    $scope.addTodo = function() {
      var newTodo = {
        _id: PouchDB.uuid(),
        text: $scope.todoText,
        done: false
      };
      $scope.todos.push(newTodo);
      $scope.todoText = '';
      $db.post(newTodo, function(err, res) {
        if (err) { console.log(err); }
        newTodo._id = res.id;
        newTodo._rev = res.rev;
      });
      
    };

    $scope.removeDone = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) {
          $scope.todos.push(todo);
        }
        else {
          $db.remove(todo);
        }
      });
    };

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.updateTodo = function(todo) {
      $db.put(todo);
    };
  });
