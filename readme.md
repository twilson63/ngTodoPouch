# ngToDoPouch 

An AngularJS Tutorial that will walk you through creating a
ToDo Application using a local PouchDb.  This tutorial should
introduce you to some of the AngularJS concepts like directives and
data-binding.  It will also show you how to build offline applications
using PouchDb. 

## Setup

IN order to get started with building our application we need to get a few things setup, you can use tools like Yeoman to help you in this process, but for this exercise we are going to do it manually to help get a better idea on what is going on under the hood.

* (Optional) Install brackets editor (http://brackets.io/)

Brackets is a new editor built on HTML5 technologies by the awesome folks over at adobe.  If you do not have an editor of choice you may want to give brackets a try.

* Install Nodejs (http://nodejs.org)

While we will not be doing any NodeJS development, NodeJS will play a big part of our build tool system and our test dev server, it also includes a package manager called npm that makes it very easy for use to install dependencies.

* Open console

``` sh
mkdir todo-pouch
cd todo-pouch
npm install bower -g
```

* What is bower?

Bower is a client-side package management tool, we are going to use this tool
to install jquery, bootstrap.css, angular, and pouchdb.  It works a lot like npm but places all of the packages in the components directory.  If you want to find out more about bower check out [http://bower.io/](http://bower.io/).

``` sh
bower init
bower install jquery bootstrap.css angular --save
bower install angular-pouch --save
```

### index.html

Next, we are going to create an index.html document, which will be our default
web document for this application.

```
touch index.html
```

``` html
<!doctype html>
<html ng-app="Todo">
<head>
  <title>TODO POUCH</title>
  <link rel="stylesheet" href="/bower_components/bootstrap.css/css/bootstrap.css">
  <link rel="stylesheet" href="/css/app.css"> 
</head>
<body>
  <div class="container">
    <ng-view></ng-view>
  </div>
  <script src="/bower_components/jquery/jquery.js"></script>
  <script src="/bower_components/angular/angular.js"></script>
  <script src="/bower_components/pouchdb-nightly.min/index.js"></script>
  <script src="/bower_components/angular-pouch/angular-pouch.js"></script>
  <script src="/ng-app.js"></script>

</body>
</html>
```

### setup grunt

Grunt is a build tool built in javascript, it allows you to create tasks that can be run to perform the `Grunt` work.  We will be installing the following tasks:

* jshint
* concat
* uglify
* connect

These grunt tasks will enable us to run our dev environment using on cmd.

``` sh
npm install grunt-cli -g
npm init
touch Gruntfile.js
npm install grunt-contrib-concat grunt-contrib-jshint grunt-contrib-uglify grunt-contrib-connect grunt-contrib-watch --save-dev
touch Gruntfile.js
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
      app: {
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
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint', 'concat']);
  grunt.registerTask('server', ['default', 'connect', 'watch']);
}
```

### create angular app directory

``` sh
mkdir app
touch app/app.js
mkdir app/controllers
touch app/controllers/main.js
mkdir app/templates
touch app/templates/main.html
```

### open app/app.js and setup the application

```
angular.module('Todo', ['angular-pouch'])
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
are injecting two services.  ($routeProvider, $locationProvider).

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

In the console (make sure you are in the project dir)

``` sh
grunt server
```
open browser to http://localhost:3000

If you see Todo Pouch in your browser, then we are setup correctly.  If not check the Chrome JavaScript console and see if you can see any errors.  Please submit in issue to this repo.

## Exercise 1 - Create the declarative template

So now we have everything setup and we are ready to get started building our application.  In this exercise we will construct the declarative html template.  Instead of using a string based template, angularjs leverages HTML and integrates their templates into the html itself, which makes it easy and intuitive to follow.

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

Create an unordered list of todo tasks, for each line item 
we want to provide a checkbox with an attribute `ng-model` assigned 
to ``$scope.todo.done`` and map the input `ng-click` attribute to ``$scope.updateTodo(todo)`.

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

## Exercise 2 - Controller

Fantastic, we have our declarative template in place, now we need to connect the template with our angular controller.  AngularJS controllers behave like view models, which means they are the glue between the presentation layer and the data/model layer.  In this step we are going to wire up the list of todos to an array, and the addTodo declaration to a function that creates a new js object and adds it to the array.

First, open main.js and add the following:

``` js
$scope.todos = [];
```

This statement initializes the $scope.todos array.

Second, we need to create the addTodo function.

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

## Exercise 3 - Remove completed todos

Continuing through the wire up process, in Exercise 3 we will connect the declaration of removeDone to a function.  In this function, we will create a copy of the current todo list and loop through the copy and remove any of the items that are marked as done, then add the items still in play to the new array.

``` js
$scope.removeDone = function() {
   var allTodos = $scope.todos;
   var remainingToDos = [];
   // loop through the todos
   angular.forEach(allTodos, function(todo) {
      // if todo is marked as done, or checked.
      if (!todo.done) {
         remainingToDos.push(todo);
      }
   });
   $scope.todos = remainingToDos;
};
```

## Exercise 4 - Display remaining todo count

Finally, we will connect the remaining declaration to a function that will provide an uptodate and accurate count of the Todo Item List.

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

After these steps, you should be able to refresh your browser at
http://localhost:3000 and create a todo, mark it as done and remove it.  But there is one problem, these todo's are only being stored in memory, so as soon as I refresh the page they will disappear.  Lets use the new PouchDb which is an offline data-storage platform that leverages the couchDb api to store data in the browser.

## Exercise 5 - PouchDb

Added PouchDb to our application, the pouchDb library connects with HTML 5 storage solutions and gives you the developer a consistent way to store data in your clients browser so that they may access it at other times.

By using an AngularJS server, we can build a simple wrapper around the PouchDb library which will instruct AngularJS how to inject into our controllers.

- Create Pouch Service

``` sh
mkdir app/services
touch app/services/pouch.js
```

By using the AngularJS constant method we are able to set the $pouch service and ensure that no one else can override our assignment.

pouch.js

``` js
angular.module('Todo')
  .factory('$db', function($pouch) {
    return $pouch('idb://todos');
  });
```

- Include in the controller

Now, we need to use angularjs's dependency injection process to bring the $pouch service to our controller.  Dependency Injection is a simple concept where you basically ask the application for any services or factoriess that you may need to use in your controller, and the application fetches those for you.

main.js

replace 

``` js
.controller('MainCtrl', function($scope) {
```

with

``` js
.controller('MainCtrl', function($scope, $db) {
```

## Exercise 6 - Persist Todo List

Now that we have PouchDb angularized, lets use the pouchDb
$db service to persist our todo list.  First we need to adjust
the addTodo function.

* On Add Todo save to pouch

``` js
$scope.addTodo = function() {
  var newTodo = {
    _id: Math.uuid(),
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
```

## Exercise 7 - Load Todo List

Next we need to retrieve all the persisted documents from pouch, we add this function to the route of the controller function.

``` js
$db.allDocs({include_docs: true}, function(err, response) {
  $scope.$apply(function() {
    response.rows.forEach(function(row) {
      $scope.todos.push(row.doc);
    });
  });
});
```

## Exercise 8 - Remove done tasks from list

By adding an else to the removeDone function we can remove the 
persisted todo from the pouch database.


``` js
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
```

## Exercise 9 - Update Todo List status

Finally, we need to update the todo document when the done checkbox is clicked.

``` js
$scope.updateTodo = function(todo) {
  $db.put(todo);
};
```

## Finished

Congrats, hopefully you completed this short tutorial and learned a little bit about angularjs and pouchdb.

Please provide feedback for improvement or if you enjoyed the exercise send me a tweet @twilson63

## License

MIT

## Thank you

* AngularJS Team
* PouchDb Team
* NodeJS Team
* Grunt Team
* Bower Team

## Contributors

* https://github.com/twilson63
* https://github.com/daraghking
* https://github.com/warrensplayer
