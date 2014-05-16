var test = require('tap').test;
var forgotCtrl = require('./account-forgot-controller');

test('forgot method should be assigned', function (t) {
  var scope = {};
  forgotCtrl(scope);
  t.ok(scope.forgot);
  t.end();
});
