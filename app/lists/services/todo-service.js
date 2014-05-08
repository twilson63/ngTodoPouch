module.exports = function($db) {
  return {
    $all: function (cb) {
      $db.query(function(doc){
        if (doc.type === "list" && doc.status === 'active')
          emit(doc._id, doc);
      }, cb);
    },
    $post: function(doc) {
      doc.type = 'list';
      doc.status = 'active';
      return $db.post(doc);
    },
    $put: function (doc) {

      return $db.put(doc);
    },
    $get: function (id) {
      return $db.get(id);
    },
    $remove: function(doc) {
      return $db.remove(doc);
    }
  };
};
