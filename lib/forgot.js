// find user and post forgot email job to email worker queue
var request = require('request');
var cloudqUrl = process.env.CLOUDQ || 'http://localhost:9000/forgot_email'
var async = require('async');
var _ = require('underscore');
var nano = require('nano')(process.env.ADMIN_URL || 'http://admin:admin@localhost:5984');
var uuid = require('uuid');

module.exports = function (body, cb) {
  // confirm email has an account
  var users = nano.use('_users');
  users.view('users', 'email', {key: body.email}, function(e,b) {
    if (e) return cb(e);
    var u = b.rows[0].value;
    // generate code
    u.reset_code = uuid.v1();
    users.insert(u, function(e,b) {
      // post forgot email job request// post forgot email job request
      request.post(cloudqUrl, { job: { klass: "email", args: [{
          user: { name: u.name, email: u.email, code: u.reset_code },
          template: 'forgotTemplate'
      }]}}, cb);
    });
  });
};
