app.factory('pisteSecData', ['$http', function($http) {
    return $http.get('') //PisteSec JSON Data
        .success(function(data) {
            return data;
            console.log(data);
        })
        .error(function(err) {
            return err;
        });
}]);