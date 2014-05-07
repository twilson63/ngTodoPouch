module.exports = function ($stateProvider) {
  $stateProvider
    .state('lists.index', {
      url: '/lists',
      controller: require('./index/list-index-controller'),
      template: require('./index/list-index.html')
    })
    .state('lists.new', {
      url: '/lists/new',
      controller: require('./new/list-new-controller'),
      template: require('./new/list-new.html')
    })
    .state('lists.show', {
      url: '/lists/:id',
      controller: require('./show/list-show-controller'),
      template: require('./show/list-show.html')
    });
};
