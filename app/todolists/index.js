module.exports = function(ng) {
  return ng.module('todolists', [])
    .config(require('./config'));
};
