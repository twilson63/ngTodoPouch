var test = require('tap').test;
var registerCtrl = require('./account-register-controller');

test('scope should have register method', function (t) {
  var scope = {};
  registerCtrl(scope);
  t.ok(scope.register);
t.end();
});