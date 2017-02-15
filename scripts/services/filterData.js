app.factory('filterData', function() {
  return {
    filterByUrlCardId: function(value, id) {
      return value.filter(function(elem) {
        return elem.c_id === id;
      });
    },
    filterByUrlSecId: function(value, id) {
      return value.filter(function(elem) {
        return elem.s_id === id;
      });
    },
    filterByUrlPisteId: function(value, id) {
      return value.filter(function(elem) {
        return elem.p_id === id;
      });
    },
    filterByUrlJohdaId: function(value, id) {
      return value.filter(function(elem) {
        return elem.j_id === id;
      });
    }
  }
});