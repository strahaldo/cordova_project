  app.controller('sabaCtrl', ['$scope',
                            'filterData',
                            '$stateParams',
                            '$localstorage',
                            'getFileFromStorage',
                            '$http',
                            '$window',
  function($scope, $filterData, $stateParams, $localstorage, getFileFromStorage, $http, $window) {


    var fileListPromise = getFileFromStorage.getFileList('sabamestari.json');

    fileListPromise.then(function(result) {
      $scope.sections = result;
      console.log($scope.sections);
    });


    var backupData = $http.get('http://sabamestariadmin.org/json_files/sections/sabamestari.php').then(function(success) {
      console.log(success.data);
      $scope.backupSections = success.data;
    });



    
  }]);