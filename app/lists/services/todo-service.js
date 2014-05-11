module.exports = function($db) {
  return {
    $all: function (name, cb) {
      $db(name).query(function(doc){
        if (doc.type === "list" && doc.status === 'active')
          emit(doc._id, doc);
      }, cb);
    },
    $post: function(name, doc) {
      doc.type = 'list';
      doc.status = 'active';
      return $db(name).post(doc);
    },
    $put: function (name, doc) {
      return $db(name).put(doc);
    },
    $get: function (name, id) {
      return $db(name).get(id);
    },
    $remove: function(name, doc) {
      return $db(name).remove(doc);
    }
  };
};
