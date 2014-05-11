var test = require('tap').test;
var rewire = require('rewire');
var register = rewire('./register');

test('register user', function (t) {
  register.__set__("nano", {
    use: function() {
      return { insert: function (doc, id, cb) { cb(null, {ok:true}); } }
    },
    db: { create: function(db, cb) { cb(null, {ok: true}); }},
    auth: function (user, pwd, cb) { cb(null, {ok: true}); }
  });

  register({ name: 'tomtest', password: 'test'}, function (err, results) {
    t.ok(results, 'results exist');
    t.ok(results[0].ok, 'first result is ok');
    t.end();
  });
});
