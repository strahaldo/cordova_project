app.factory('sabaSecData', ['$http', function($http) {
    return $http.get('') //SabaSec JSON Data
        .success(function(data) {
            return data;
            console.log(data);
        })
        .error(function(err) {
            return err;
        });
}]);
