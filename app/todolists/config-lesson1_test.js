var test = require('tap').test;
var rewire = require('rewire')
var config = rewire('./config');


test('App should have a config section that sets up default route', function(t) {
  config.__set__('require', function(path) {
    t.equals(path, './list/todolist-list.html');
  });
  config({
    state: function() {
      return this;
    }
  });
  t.end();
});
