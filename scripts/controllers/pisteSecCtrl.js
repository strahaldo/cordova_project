app.controller('pisteSecCtrl', ['$scope',
                               'filterData',
                               '$stateParams',
                               '$localstorage',
                               'getFileFromStorage',
                               '$http',
  function($scope, $filterData, $stateParams, $localstorage, getFileFromStorage, $http) {

    var secListPromise = getFileFromStorage.getFileList('pistemestari.json');

    secListPromise.then(function(result) {
      $scope.sections = result;
      $scope.p_sec = $filterData.filterByUrlPisteId($scope.sections, parseInt($stateParams.pId))[0];
    });

    $scope.sortorder = 'title';

    var fileListPromise = getFileFromStorage.getFileList('piste_cards.json');

    fileListPromise.then(function(result) {
      $scope.cards = [];
      angular.forEach(result, function(value, key) {
        if (value.p_id === parseInt($stateParams.pId)) {
          $scope.cards.push(value);
        };
      });
    });


    //Backup data
    
    var backupSec = $http.get('http://sabamestariadmin.org/json_files/sections/pistemestari.php').then(function(success) {
      console.log(success.data);
      $scope.backupSections = success.data;
      $scope.backupSec = $filterData.filterByUrlSecId($scope.backupSections, parseInt($stateParams.pId))[0];

    });



    var backupData = $http.get('http://sabamestariadmin.org/json_files/pistemestari/piste_cards.php').then(function(success) {
      console.log(success.data);
      $scope.backupCards = [];
      angular.forEach(success.data, function(value, key) {
        if (value.p_id === parseInt($stateParams.pId)) {
          $scope.backupCards.push(value);
        };
      });
      console.log($scope.backupCards);


    });



    /*
    pisteImageData.success(function(data) {
      $localstorage.setObject('pImageData', data);
    });

    $scope.p_sections = $localstorage.getObject('secData');
    $scope.p_sec = $filterData.filterByUrlPisteId($scope.p_sections, parseInt($stateParams.pId))[0];

    $scope.cards = [];
    $scope.images = [];

    pisteCardData.success(function(data) {
      $localstorage.setObject('cardData', data);
    });

    var cData = $localstorage.getObject('cardData');
    var iData = $localstorage.getObject('pImageData');

    angular.forEach(cData, function(value, key) {
      if (value.p_id === parseInt($stateParams.pId)) {
        $scope.cards.push(value);
      };
    });
    */
  }])