module.exports = function ($stateProvider) {
  $stateProvider
    .state('lists', {
      url: '/lists',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('lists.index', {
      url: '/',
      controller: ['$scope', '$todoSvc',
        require('./index/list-index-controller')],
      template: require('./index/list-index.html')
    })
    .state('lists.new', {
      url: '/new',
      controller: ['$scope', '$todoSvc', '$state',
        require('./new/list-new-controller')],
      template: require('./new/list-new.html')
    })
    .state('lists.show', {
      url: '/:id',
      controller: ['$scope', '$todoSvc','$stateParams', '$state',
        '$us', '$window',
        require('./show/list-show-controller')],
      template: require('./show/list-show.html')
    });
};
