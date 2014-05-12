module.exports = function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: ['$scope', '$accountSvc', 'growl',
        require('./login/account-login-controller')],
      template: require('./login/account-login.html')
    })
    .state('register', {
      url: '/register',
      controller: ['$scope', '$accountSvc', 'growl',
        require('./register/account-register-controller')],
      template: require('./register/account-register.html')
    })
    .state('forgot', {
      url: '/forgot',
      controller: ['$scope', '$accountSvc',
        require('./forgot/account-forgot-controller')],
      template: require('./forgot/account-forgot.html')
    })
    .state('reset', {
      url: '/reset',
      controller: ['$scope', '$accountSvc',
        require('./reset/account-reset-controller')],
      template: require('./reset/account-reset.html')
    });
};
