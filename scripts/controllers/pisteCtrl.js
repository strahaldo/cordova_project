app.controller('pisteCtrl', ['$scope',
                            'filterData',
                            '$stateParams',
                            'pisteSecData',
                            '$localstorage',
                            'getFileFromStorage',
                            '$http',
  function($scope, $filterData, $stateParams, pisteSecData, $localstorage, getFileFromStorage, $http) {

    var fileListPromise = getFileFromStorage.getFileList('pistemestari.json');

    fileListPromise.then(function(result) {
      $scope.p_sections = result;
      console.log($scope.p_sections);
    });


    var backupData = $http.get('http://sabamestariadmin.org/json_files/sections/pistemestari.php').then(function(success) {
      console.log(success.data);
      $scope.backupSections = success.data;
    });

  }]);