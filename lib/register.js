// register user
var async = require('async');
var _ = require('underscore');
var nano = require('nano')(process.env.ADMIN_URL || 'http://admin:admin@localhost:5984');

module.exports = function(data, cb) {
  var user = _.clone(data);
  _(user).extend({ type: 'user', roles: ['account']});
  var security = {
    admins: { roles: [], names: []},
    members: { roles: ['admins'], names: [user.name]}
  };
  async.series([
    async.apply(nano.use('_users').insert, user, 'org.couchdb.user:' + user.name),
    async.apply(nano.db.create, user.name),
    async.apply(nano.use(user.name).insert, security, '_security'),
    async.apply(nano.auth, user.name, user.password)
  ], cb);
};
