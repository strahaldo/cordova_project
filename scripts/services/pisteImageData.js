app.factory('pisteImageData', ['$http', function($http) {
    return $http.get('') //PisteImage JSON Data
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);