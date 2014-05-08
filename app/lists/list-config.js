module.exports = function ($stateProvider) {
  $stateProvider
    .state('lists', {
      url: '/lists',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('lists.index', {
      url: '/',
      controller: require('./index/list-index-controller'),
      template: require('./index/list-index.html')
    })
    .state('lists.new', {
      url: '/new',
      controller: require('./new/list-new-controller'),
      template: require('./new/list-new.html')
    })
    .state('lists.show', {
      url: '/:id',
      controller: require('./show/list-show-controller'),
      template: require('./show/list-show.html')
    });
};
