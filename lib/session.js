//var nano = require('nano')(process.env.USER_URL || 'http://localhost:5984');
var dbsvr = process.env.USER_URL || 'http://localhost:5984';
var request = require('request');

module.exports = function (cookie, cb) {
  request(dbsvr + '/_session', { json: true, headers: { cookie: cookie}}, cb);
  //nano.request({ db: '_session', headers: { 'cookie': cookie }}, cb);
};
