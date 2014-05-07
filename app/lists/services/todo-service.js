module.exports = function($db) {
  return {
    $all: function () {
      return $db.query({ map: function(doc) {
        if (doc.type === "list" && doc.status === 'active')
          emit(doc._id, doc);
      }});
    },
    $put: function (doc) {
      return $db.put(doc)
    },
    $get: function (id) {
      return $db.get(id);
    }
  };
};
