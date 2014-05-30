module.exports = function(pouch, $q) {
  return function() {
    return {
      $post: function(doc) {
        doc.type = 'list';
        doc.status = 'active';
        return pouch.post(doc);
      }
    }
  }
}
