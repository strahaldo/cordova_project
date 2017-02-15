app.factory('pisteCardData', ['$http', function($http) {
    return $http.get('') //PisteCard JSON Data
        .success(function(data) {
            return data;
            console.log(data);
        })
        .error(function(err) {
            return err;
        });
}]);