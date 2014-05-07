module.exports = function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: require('./login/account-login-controller'),
      template: require('./login/account-login.html')
    })
    .state('register', {
      url: '/register',
      controller: require('./register/account-register-controller'),
      template: require('./register/account-register.html')
    });
};
