module.exports = function ($db, $http, $origin, $q, $timeout) {
  return {
    // takes user name and syncs pouchDb
    create: function (user) {
      var deferred = $q.defer();
      var opts = { live: true };
      var remoteDb = $origin + '/db/' + user.name;
      $db(user.name).sync(remoteDb, opts);
      $timeout(function() {
        deferred.resolve({ name: user.name, db: $db(user.name)});
      }, 1);
      return deferred.promise;
    },
    get: function () {
      var deferred = $q.defer();
      $http.get('/api/session').then(function (res) {
        if (res.data.userCtx && res.data.userCtx.name) {
          deferred.resolve({ name: res.data.userCtx.name });
          return;
        }
        deferred.reject(res.data);
      });
      return deferred.promise;
    },
    destroy: function () {
      return $http.post('/api/logout');
    }
  };
};
