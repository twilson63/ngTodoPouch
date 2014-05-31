var test = require('tap').test;
var fs = require('fs');

test('App should have', function(t) {
  t.ok(isFile('app/app-controller.js'), 'app/app-controller.js');
  t.end();
});

test('App should have', function(t) {
  t.ok(isFile('app/config.js'), 'app/config.js file');
  t.end();
});

test('App should have ./app/config.js', function(t) {
  t.ok(isFile('app/config.js'));
  t.end();
});

test('App should have todolists folder', function(t) {
  t.ok(isDirectory('app/todolists'),
    'app/todolists directory should exist');
  t.end();
});

test('App should have todolists index file', function(t) {
  t.ok(isFile('app/todolists/index.js'),
    'app/todolists/index.js should exist');
  t.end();
});

test('App should have todolists list directory', function(t) {
  t.ok(isDirectory('app/todolists/list'),
    'app/todolists/list should exist');
  t.end();
});

test('App should have todolists/list/todolist-list.html', function(t) {
  t.ok(isFile('app/todolists/list/todolist-list.html'),
    'app/todolists/list/todolist-list.html should exist');
  t.end();
});

function isDirectory(path) {
  return fs.statSync(__dirname + '/../' + path).isDirectory()
}

function isFile(path) {
  return fs.statSync(__dirname + '/../' + path).isFile()
}
