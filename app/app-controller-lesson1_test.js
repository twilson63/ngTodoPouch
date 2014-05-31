var test = require('tap').test;
var appController = require('./app-controller');


test('AppCtrl should be defined', function(t) {
  var scope = rootScope = {};
  appController(scope, rootScope);
  t.equals(rootScope.title, 'TodoLists', 'RootScope Title should be set to todolists');
  t.end();
});
