var start = module.exports = function(ng) {
  ng.module('todolists', ['ui.router', 'angular-growl',
    require('./todolists')(ng).name
  ])
  .config(require('./config'))
  .controller('AppCtrl', require('./app-controller'));
};

// dependencies ...
if (!module.parent) {
  require('angular/angular');
  require('angular-ui-router/release/angular-ui-router');
  require('angular-sanitize/angular-sanitize');
  require('angular-growl/build/angular-growl');

  start(angular);
}
