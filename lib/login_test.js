var test = require('tap').test;
var rewire = require('rewire');
var login = rewire('./login');

login.__set__("nano", {
  auth: function (name, pwd, cb) {
    cb(null, {ok: true}, {'set-cookie': ['AuthSession=Foo']});
  }
})

test('login should be successfull', function (t) {
  login({ name: 'twilson63b', password: 'test'}, function (err, res, headers) {
    t.ok(res.ok, 'response returns ok:true');
    t.end();
  });
});
