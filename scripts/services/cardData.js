app.factory('cardData', ['$http', '$q', function($http, $q) {
    return $http.get('') //Card JSON Data
        .success(function(data) {
            return data;
            console.log(data);
        })
        .error(function(err) {
            return err;
        });
}]);