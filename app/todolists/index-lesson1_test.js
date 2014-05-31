var test = require('tap').test;
var rewire = require('rewire');
var todolist = rewire('./index');
var _ = require('underscore');

test('Index should', function(t) {
  var ng = {
    module: function(name, array) {
      t.ok(true, 'call the module method!');
      t.equals(name, 'todolists','set module name to `todolists` ');
      t.ok(_.isArray(array), 'send an array to the module ctor');
      return this;
    },
    config: function() {
      t.ok(true, 'call the config method')
      return this;
    }
  }
  todolist(ng);
  t.end();
})
