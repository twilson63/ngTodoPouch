angular.module('Todo', [])
  .config(function($routeProvider, $locationProvider) {
    'use strict';
    
    $routeProvider
      .when('/', { 
        controller: 'MainCtrl', 
        templateUrl: '/app/templates/main.html'
      });
    $locationProvider.html5Mode(true);
  });
angular.module('Todo')
  .controller('MainCtrl', function($scope) {
    'use strict';
    $scope.todos = [];
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
    
    $scope.addTodo = function() {
      var newTodo = {
        _id: Math.uuid(),
        text: $scope.todoText,
        done: false
      };
      $scope.todos.push(newTodo);
      $scope.todoText = '';
    };

    $scope.updateTodo = function() {
      var newTodo = {
        _id: Math.uuid(),
        text: $scope.todoText,
        done: false
      };
      $scope.todos.push(newTodo);
      $scope.todoText = '';
    };

    $scope.removeDone = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) {
          $scope.todos.push(todo);
        }
        else {
          $scope.removeTodo(todo);
        }
      });
    };


    $scope.removeTodo = function(todo) {
      $scope.todos.splice(
        $scope.todos.indexOf(todo), 1);
      };
    });