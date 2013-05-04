angular.module('Todo')
  .controller('MainCtrl', function($scope, $pouch) {
    'use strict';
    $scope.todos = [];

    $pouch.allDocs({include_docs: true}, function(err, response) {
      $scope.$apply(function() {
        response.rows.forEach(function(row) {
          $scope.todos.push(row.doc);
        });
      });
    });

    $scope.addTodo = function() {
      var newTodo = {
        _id: Math.uuid(),
        text: $scope.todoText,
        done: false
      };
      $scope.todos.push(newTodo);
      $scope.todoText = '';
      $pouch.post(newTodo, function(err, res) {
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
          $scope.removeTodo(todo);
        }
      });
    };

    $scope.removeTodo = function(todo) {
      $pouch.remove(todo);
    };

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.updateTodo = function(todo) {
      $pouch.put(todo);
    };
  });
