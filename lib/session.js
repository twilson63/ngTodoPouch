var nano = require('nano')(process.env.USER_URL || 'http://localhost:5984');
module.exports = function (cookies, cb) {
  nano.request({ db: '_session', headers: { 'cookies': cookies }}, cb);
};
