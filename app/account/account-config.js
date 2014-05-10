module.exports = function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: ['$scope', '$accountSvc',
        require('./login/account-login-controller')],
      template: require('./login/account-login.html')
    })
    .state('register', {
      url: '/register',
      controller: ['$scope', '$accountSvc',
        require('./register/account-register-controller')],
      template: require('./register/account-register.html')
    });
};
