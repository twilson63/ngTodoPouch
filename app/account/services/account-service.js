module.exports = function ($http) {
  return {
    $register: function(user) {
      return $http.post('/register', user);
    },
    $login: function(user) {
      return $http.post('/db/_session', user);
    }
  }
}
