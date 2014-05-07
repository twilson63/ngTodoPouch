module.exports = function ($stateProvider) {
  $stateProvider
    .state('index', {
      url: '/lists',
      controller: require('./index/list-index-controller'),
      template: require('./index/list-index.html')
    })
};
