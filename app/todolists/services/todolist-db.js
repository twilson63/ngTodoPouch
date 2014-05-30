module.exports = function(pouch, $q, underscore) {
  var _ = underscore;
  return function() {
    return {
      $get: function(id) {
        return pouch.get(id);
      },
      $all: function() {
        var deferred = $q.defer();
        pouch.query(function(doc) {
          if (doc.type === "list" && doc.status === 'active')
            emit(doc._id);
          }, { include_docs: true },
          function(err, results) {
            if (err) return deferred.reject(err);
            deferred.resolve(_(results.rows).pluck('doc'));
          }
        );
        return deferred.promise;
      },
      $post: function(doc) {
        doc.type = 'list';
        doc.status = 'active';
        return pouch.post(doc);
      },
      $put: function(doc) {
        return pouch.put(doc);
      },
      $remove: function(doc) {
        return pouch.remove(doc);
      }
    }
  }
}
