var test = require('tap').test;
var loginCtrl = require('./account-login-controller');

test('login method should be assigned', function (t) {
  var scope = {};
  loginCtrl(scope);
  t.ok(scope.login);
  t.end();
});