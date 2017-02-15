  app.controller('sectionCtrl', ['$scope',
                               'filterData',
                               '$stateParams',
                               '$localstorage',
                               'getFileFromStorage',
                               '$http',
  function($scope, 
           $filterData, 
           $stateParams, 
           $localstorage, 
           getFileFromStorage,
           $http) {


    var secListPromise = getFileFromStorage.getFileList('sabamestari.json');

    $scope.source = 'cdvfile://localhost/persistent/sabamestari/.images/sabamestari';

    secListPromise.then(function(result) {
      $scope.sections = result;
      $scope.sec = $filterData.filterByUrlSecId($scope.sections, parseInt($stateParams.sId))[0];
    });


    $scope.secid = $stateParams.sId;

    $scope.sortorder = 'title';

    var fileListPromise = getFileFromStorage.getFileList('saba_cards.json');

    fileListPromise.then(function(result) {
      $scope.cards = [];
      angular.forEach(result, function(value, key) {
        if (value.s_id === parseInt($stateParams.sId)) {
          $scope.cards.push(value);
        };
      });
      console.log($scope.cards);

    });

    console.log($stateParams.s_id);

    if (typeof $scope.sec === 'undefined') {
      $scope.checkSec = false;
    } else {
      $scope.checkSec = true;
    }


    //Backup data
    
    var backupSec = $http.get('http://sabamestariadmin.org/json_files/sections/sabamestari.php').then(function(success) {
      console.log(success.data);
      $scope.backupSections = success.data;
      $scope.backupSec = $filterData.filterByUrlSecId($scope.backupSections, parseInt($stateParams.sId))[0];

    });





    var backupData = $http.get('http://sabamestariadmin.org/json_files/sabamestari/saba_cards.php').then(function(success) {
      console.log(success.data);
      $scope.backupCards = [];
      angular.forEach(success.data, function(value, key) {
        if (value.s_id === parseInt($stateParams.sId)) {
          $scope.backupCards.push(value);
        };
      });
      console.log($scope.backupCards);


    });


  }]);