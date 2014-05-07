# ngTodoPouch

This is a tutorial repo that walks you through creating a Federated AngularJS Todo Application using the following tools:

AngularJS
Bootstrap
Atomify
PouchDb
NodeJS
CouchDb - Cloudant

The application will be setup to register an account then login and add todos and mark them complete.  Your account should be accessible anywhere, including offline.

The purpose is to experiement with a reactive architecture that shares nothing using pouchdb, couchdb, and nodejs.

## Setup

1. Install Nodejs and Npm - http://nodejs.org
2. Install bower -> `npm install bower -g`
3. Create Project Directory `todo-app`
4. Open Terminal in the todo-app directory
5. Edit/Create a `.bowerrc' file and add the following:

```
{
  "directory": "node_modules"
}
```

The `.bowerrc' file allows you to modify the default options of the bower application, here we are changing the directory from `bower_components` to `node_modules`.

This is a hack that we will use to import `angular` and `angular-ui-router` into our browserify style app structure.

6. run bower init and follow prompts

```
bower init
bower install bootstrap angular angular-ui-router --save
```

7. run npm init and follow prompts

```
npm init
# maybe add hbs 'handlebars' for server-side
npm install express pouchdb nano --save
npm install tap atomify --save-dev
```

8. setup build scripts in package.json

```
{
  ...
  "scripts": {
    "watch": "atomify -d",
    "start": "node server.js",
    "test" : "node test/**/*.js",
    "dev": "npm run watch & npm start"
  },
  ...
}
```

9. setup atomify in package.json

```
{
  ...
  "atomify": {
    "js": {
      "entry": "app/index.js",
      "output": "www/bundle.js",
      "watch": true
    },
    "css": {
      "entry": "app/index.css",
      "output": "www/bundle.css"
    }
  },
  ...
}
```

10 setup project directories and files

```
mkdir app
mkdir test
mkdir www
touch www/index.html
touch app/index.js
touch app/index.css
```

So these 10 steps should ge you setup to start coding.

* Why no Grunt, Gulp, Yeoman?

Grunt comes with a lot of extra stuff, but it is a great tool and has a lot of community support.  Same with Gulp and Yeoman.  But I wanted you to see what is going on behind the scenes, certainly you do not have to do this everytime, but it is helpful to know where everything is.

Our client side application will live in the app folder, our express application will live on the root folder as `app.js` with a `server.js` to actually start the app.  `www` will be our public folder and `test` will contain all of our tests.  To run tests:

```
npm test
```

To run the dev environment:

```
npm run dev
```

---

Now that we have our project structure setup, we need to start adding some code.  We will start with setting up a simple server.  We could have used a simple web server tool, but we know we will be using nodejs to connect up to the couchdb so it just makes sense to go ahead and set it up.

1. create file `server.js`

``` js
var app = require('./app');
app.listen(3000);
```

2. create `app.js`

``` js
var express = require('express');
var app = express();

app.use(express.static('www'));

module.exports = app;

```

3. create/edit `www/index.html`

``` html
<!DOCTYPE html>
<html ng-app="TodoApp">
  <head>
    <meta charset="utf-8">
    <title>Todo App</title>
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,100' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/bundle.css">
  </head>
  <body>
    <div ng-controller="ApplicationCtrl">
      <div ui-view></div>
    </div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

4. Lets copy the dist files for bootstrap for now.

```
cp -rf node_modules/bootstrap/dist/. www
```
## Seting up the client app

In the app folder lets open the index.js file
and add the following:

``` js
require('angular/angular');
require('angular-ui-router/release/angular-ui-router');

angular.module('TodoApp', ['ui.router'])
  .config(require('./app-config'))
  .controller('ApplicationCtrl', require('./app-controller'));

```

create `app-router.js`

``` js
module.exports = function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
};
```

create `app-controller.js`

``` js
module.exports = function ($scope) {
  $scope.title = 'TODO App';
};
```

And in the css file, lets add a font, `Roboto`

```
body: {
  font-family: 'Roboto', sans-serif;
}
```

---

Lets go ahead and create some quick tests

