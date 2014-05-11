var test = require('tap').test;
var rewire = require('rewire');
var session = rewire('./session');

test('session should return current session', function (t) {
  session('AuthSession=dHdpbHNvbjYzYjo1MzZEODQwQzqv3tjx8eWq9QbVsXd9l-iF_aW7Qg; Version=1; Path=/; HttpOnly' ,
    function (err, body, headers) {
      console.log(err);
      console.log(body);
      console.log(headers);
      t.end();
  });
});
