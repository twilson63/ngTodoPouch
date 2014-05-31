# ngTodoPouch - Lesson1



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

### Lesson 2 (Controllers and ng-repeat)
