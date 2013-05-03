# ngToDoPouch (work in progress....)

An AngularJS Tutorial that will walk you through creating a
ToDo Application using a local PouchDb. 

## Setup

* Install brackets (http://brackets.io/)
* Install Emmet Extension (https://github.com/emmetio/emmet/downloads)
* Install Nodejs (http://nodejs.org)
* Open console

``` sh
mkdir todo-pouch
cd todo-pouch
npm install bower -g
bower init
bower install jquery bootstrap.css angular --save
ower install http://download.pouchdb.com/pouchdb-nightly.min.js --save
touch index.html
```

index.html - emmet version

``` html
html[ng-app="Todo"]>head>title{TODO POUCH}+link[href="/components/bootstrap/css/bootstrap.css"]^body>.container>h1{TODO POUCH}+ng-view^script[src="/components/jquery/jquery.js"]+script[src="/components/angular/angular.js"]+script[src="/components/pouchdb-nightly.min/index.js"]+script[src="/app/ng-app.js"]
```

index.html

``` html
<!doctype html>
<html ng-app="Todo">
<head>
  <title>TODO POUCH</title>
  <link rel="stylesheet" href="/components/bootstrap/css/bootstrap.css">
</head>
<body>
  <div class="container">
    <h1>TODO POUCH</h1>
    <ng-view></ng-view>
  </div>
  <script src="/components/jquery/jquery.js"></script>
  <script src="/components/angular/angular.js"></script>
  <script src="/components/pouchdb-nightly.min/index.js"></script>
</body>
</html>
```
setup grunt

``` sh
npm install grunt-cli -g
npm init
touch Gruntfile.js
npm install grunt-contrib-concat grunt-contrib-jshint grunt-contrib-uglify grunt-contrib-watch --save-dev
```
Paste the following js in Gruntfile.js

``` js
var www = __dirname;

var appFiles = [
www + '/app/app.js',
www + '/app/services/*.js',
www + '/app/filters/*.js',
www + '/app/directives/*.js',
www + '/app/controllers/*.js'
];

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: appFiles
    },
    concat: {
      app: {
        src: appFiles,
      dest: www + '/ng-app.js'
      }
    },
    uglify: {
      grxnet: {
        src: [ www + '/ng-app.js'],
        dest: www + '/ng-app.min.js'
      }
    },
    watch: {
      scripts: {
        files: www + '/app/**/*.js',
        tasks: ['jshint','concat'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'jshint concat uglify');

}

```

Install web server

``` sh
npm install w3 -g
```

create app directory

``` sh
mkdir app
touch app/app.js
mkdir app/controllers
touch app/controllers/main.js
mkdir app/templates
touch app/templates/main.html
```

open app/app.js and setup the application

```
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
```

In the app.js we are adding a config section, in this section we
are injected two services.  ($routeProvider, $locationProvider).

$routeProvider gives the ability to do routing.

$locationProvider gives us html5 push updates.

open app/controllers/main.js

``` js
angular.module('Todo')
  .controller('MainCtrl', function($scope) {
    
  });
```

open app/templates/main.html

```
<h1>Todo Pouch</h1>
```

Lets confirm we have everything setup correctly.

Open two console windows

console 1 - make sure you are in the project dir

``` sh
grunt concat
grunt watch
```

console 2 - make sure your in the project dir

``` sh
w3
```

open browser to http://localhost:3000

If you see Todo Pouch in your browser, then we are setup correctly.

# Exercise 1 - Create the declarative templatek

We will step through the declarative template line by line.

``` html
<span>{{remaining()}} of {{todos.length}} remaining</span>
```

Show how many todos of total have not been completed.
We are using the ng-bind directive to call $scope.remaining() function to get the number of todos that have not been marked completed.  Then we use the ng-bind directive to call the $scope.todos.length to get the total count of todo items.

``` html
[<a ng-href="" ng-click="removeDone()">Remove done</a>]
```

Give the user the ability to remove all done tasks from the list.  Here we are using an anchor element and a ng-click attribute to map the anchor click event to the $scope.removeDone function.

``` html
<ul class="unstyled">
  <li ng-repeat="todo in todos">
    <input type="checkbox" ng-model="todo.done" ng-click="updateTodo(todo)">
    <span ng-class="{{done: todo.done">{{todo.text}}</span>
  </li>
</ul>
```

Create an unorded list of todo tasks, for each line item 
we want to provide a checkbox with an attribute `ng-model` assigned 
to $scope.todo.done and map the input ng-click attribute to $scope.updateTodo(todo).

Next we want to use the ng-class directive to add the `done` class to the span element if `todo.done === true`.  And use the ng-bind directive to show the todo task.


``` html
<form ng-submit="addTodo()">
  <input type="text" ng-model="todoText"  size="30"
         placeholder="add new todo here">
  <input class="btn btn-primary" type="submit" value="add">
</form>
```

Finally, we want to add a form with a directive `ng-submit`, which is assigned to `$scope.addTodo()`.  In the form, we are assigning the input element `ng-model` to $scope.todoText.

Open the browser and you should now see the total text and input form.

# Exercise 2 - Controller

Lets wire the view to the controller and models.

open main.js and add the following:

``` js
$scope.todos = [];
```

initialize the $scope.todos array.

```js
$scope.addTodo = function() {
  var newTodo = {
    _id: Math.uuid(),
    text: $scope.todoText,
    done: false
  };
  $scope.todos.push(newTodo);
  $scope.todoText = '';
};
```

Add todo function

# Exercise 3 

``` js
$scope.removeDone = function() {
  // backup array
  var oldTodos = $scope.todos;
  // reset to an empty array
  $scope.todos = [];
  // loop through the old values
  angular.forEach(oldTodos, function(todo) {
    // if todo is marked as done, or checked.
    if (!todo.done) {
      // add todo to the array
      $scope.todos.push(todo);
    }
    else {
      // remove todo from array
      $scope.removeTodo(todo);
    }
  });
};
```
Remove all items that are marked as done.


# Exercise 4 

```
$scope.remaining = function() {
  var count = 0;
  angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
  });
  return count;
};
```

add the remaining function to the controller.  Now we should 
see 0 of 0 remaining.

# Exercise 5 - PouchDb

- Create Pouch Service
- Include in the controller

# Exercise 6 - Persist Todo List

# Exercise 7 - Load Todo List

# Exercise 8 - Update Todo List status

# Exercise 9 - Remove done tasks from list

