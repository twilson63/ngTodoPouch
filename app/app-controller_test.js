var test = require('tap').test;
var appCtrl = require('./app-controller');

test('set $scope.title to TODO App', function(t) {
  var scopeMock = {};
  appCtrl(scopeMock);
  t.equals(scopeMock.title, 'TODO App');
  t.end();
});