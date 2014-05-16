module.exports = function ($http) {
  return {
    $register: function(user) {
      return $http.post('/api/register', user);
    },
    $login: function(user) {
      return $http.post('/api/login', user);
    },
    $forgot: function(user) {
      return $http.post('/api/forgot', user);
    }
  }
}
