var nano = require('nano')(process.env.ADMIN_URL || 'http://admin:admin@localhost:5984');

module.exports = function (data, cb) {
  nano.auth(data.name, data.password, cb);
};
