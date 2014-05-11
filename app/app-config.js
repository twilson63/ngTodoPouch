module.exports = function ($urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
  // $httpProvider.interceptors.push(function ($rootScope, $state, $q) {
  //   return {
  //     'responseError': function (rejection) {
  //       console.log($state.current);
        //if (rejection.state === 401 && $state.current != login) {
        //  $state.go('login');
  //       //}
  //     }
  //   }
  // });
};
