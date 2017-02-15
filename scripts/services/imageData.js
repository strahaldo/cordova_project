app.factory('imageData', ['$http', function($http) {
    return $http.get('') //Image JSON Data
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);