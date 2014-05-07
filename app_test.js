// Express App Test
var request = require('supertest');
var app = require('./app');
var test = require('tap').test;

test('confirm web app returns 200 on GET /', function(t) {
  request(app).get('/').end(function(e, r) {
    t.equals(r.statusCode, 200);
    t.end()
  });
});
