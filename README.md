# ngTodoPouch

This is a tutorial repo that walks you through creating a Federated AngularJS Todo Application using the following tools:

* AngularJS
* Bootstrap
* Atomify
* PouchDb
* NodeJS
* CouchDb or Cloudant

The application will be setup to register an account then login and add todos and mark them complete.  Your account should be accessible anywhere, including offline.

The purpose is to experiment with a reactive architecture that shares nothing using pouchdb, couchdb, and nodejs.

## Setup

1. Install Nodejs and Npm - http://nodejs.org
1a. You may want to set your user to own your /usr/local directory so you do not have to type `sudo` for every npm global command
2. Install bower -> `npm install bower -g`
3. Create Project Directory `todo-app`
4. Open Terminal in the todo-app directory
5. Edit/Create a `.bowerrc' file and add the following:

The `.bowerrc' file allows you to modify the default options of the bower application, here we are changing the directory from `bower_components` to `node_modules`.

This is a hack that we will use to import `angular` and `angular-ui-router` into our browserify style app structure.

6. create bower.json and install bootstrap and angular
7. create package.json and install express and nano
8. setup build scripts in package.json
9. setup atomify in package.json
10 setup project directories and files

```
npm install bower -g
echo '{"directory": "node_modules"}' > .bowerrc
echo '{"name": "todo-list", "version": "0.0.0"}' > bower.json
bower install bootstrap angular angular-ui-router pouchdb --save

echo '{"name": "todo-list", "version": "0.0.0", }' > package.json
npm install jaws underscore request async uuid nano --save
npm install tap atomify nodemon --save-dev

# add scripts
json -I -f package.json -e 'this.scripts={watch:"atomify -d", start:"nodemon server.js", test: "tap **/*_test.js", dev:"npm run watch & npm start"};'

# atomify
json -I -f package.json -e 'this.atomify={js:{entry:"app/index.js",output:"www/bundle.js"}, css: {entry:"app/index.css", output:"www/bundle.css"}}'

mkdir app
mkdir test
mkdir www
(curl -L# https://gist.githubusercontent.com/twilson63/d88d6175b64f524c2884/raw/fc7d852865d57e3642352448e70539c0bff0bbd5/index.html > www/index.html)
(curl -L# https://gist.githubusercontent.com/twilson63/d88d6175b64f524c2884/raw/fc7d852865d57e3642352448e70539c0bff0bbd5/index.js > app/index.js)
(curl -L# https://gist.githubusercontent.com/twilson63/d88d6175b64f524c2884/raw/fc7d852865d57e3642352448e70539c0bff0bbd5/index.css > app/index.css)
```

or if you don't want to type ||||
                             VVVV
```
(curl -L# https://gist.githubusercontent.com/twilson63/d88d6175b64f524c2884/raw/aa39d37ed5fc12931a17e42ab8c854ccb6e91511/setup.sh | sh)
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
<html ng-app="todolists">
  <head>
    <meta charset="utf-8">
    <title>Todo App</title>
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,100' rel='stylesheet' type='text/css'>
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
## Setting up the client app

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
