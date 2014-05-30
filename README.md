# ngTodoPouch

An AngularJS Todo App Tutorial that uses PouchDb as a datastore.

This readme file will walk you through step by step on building an AngularJS todo application.

## Setup

In this step we will setup your dev environment to get started!

```
# clone repo
git clone https://github.com/twilson63/ngTodoPouch.git
# change to repo directory
cd ngTodoPouch
# git all branches
git fetch all
# checkout the setup branch
git checkout setup
# install modules
npm install
# install client modules
# you may need to do `npm install bower -g` first
bower install
# confirm all tests pass
npm test
# start up app
npm start
```

## Lesson 1 (modules, state, and templates)

Now that you are ready to go, we are going to start out building a mock version of your todo app.  This version will focus on the interface and css.  But we do want to create a template to hold our mock html, and we will need to create a controller and a ui route.

### Creating the global configuration section

In AngularJS, module's config method is where we add our configuration information.  In this case, we are going to inject `$urlRouterProvider` and default it to to the '/todolists' path for now.

app/app.js

>  As a user
>  I want to be directed to the todolists view if not specified
>  So that I can see all of my lists

```
angular.module(....)
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/todolists/');
  })
  ...

```

### add our feature :todolists, this feature will list all
of the user's todolists.

>  As a user when I am on the /todolists route
>  I want to see my todolists

```
# create todolists directory
mkdir app/todolists
# create index.js file in app/todolists
touch app/todolists/index.js
mkdir app/todolists/list
touch app/todolists/list/todolist-list.html

```

### Add the following `code` to the index.js file

```
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
```

### create our mock html template:

```
<div class="pull-right">
  <button class="btn btn-default">New List</button>
</div>
<h2>My Lists</h2>
<div class="list-group">
  <a class="list-group-item">List 1</a>
  <a class="list-group-item">List 2</a>
</div>
```

### Include our `todolists` module in our app

app/app.js

```
angular.module('todolists', ['ui.router', 'angular-growl',
  require('./todolists').name
])
```

### Lesson 2 (Controllers, ng-repeat, and testing)

In this lesson we are going angularize our mocked up html.

Lets create a controller:

```
touch app/todolists/list/todolist-list-controller.js
touch app/todolists/list/todolist-list-controller_test.js
```

todolist-list-controller.js

```
module.exports = function($scope) {
  $scope.list = [
    {name: 'List 1'},
    {name: 'List 2'}
  ];
};
```

todolist-list-controller_test.js

```
var test = require('tap').test;
var listCtrl = require('./todolist-list-controller');

test('scope.list should have 2 items', function(t){
  var scope = {};
  listCtrl(scope);
  t.equals(scope.list.length, 2);
  t.end();
});
```

package.json - change test cmd

```
{
  ...
  "scripts": {
    "test": "tap ./app/**/*_test.js"
  }
  ...
}

```

### Lesson 3 (links and forms)

```
mkdir app/todolists/new
touch app/todolists/new/todolist-new.html
touch app/todolists/new/todolist-new-controller.js
touch app/todolists/new/todolist-new-controller_test.js

mkdir app/todolists/show
touch app/todolists/show/todolist-show.html
touch app/todolists/show/todolist-show-controller.js
touch app/todolists/show/todolist-show-controller_test.js

```

### Lesson 4 (add/complete/remove todo items)

### Lesson 5 (persist data to pouchdb)

### Lesson 6 (load data from pouchdb)
