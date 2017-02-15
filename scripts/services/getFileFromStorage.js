app.factory('getFileFromStorage', ['$http', '$q', function($http, $q) {
  return {
    getFileList: function(jsonName) {
    return $http.get('cdvfile://localhost/persistent/sabamestari/data/' + jsonName)
        .then(function(result) {
          return result.data;
        });
    }
  }
}]);