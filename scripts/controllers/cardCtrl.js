app.controller('cardCtrl', ['$scope',
                            '$rootScope',
                            'filterData', 
                            'getFileFromStorage',
                            '$stateParams', 
                            '$localstorage',
                            '$http',
  function($scope, $rootScope, $filterData, getFileFromStorage, $stateParams, $localstorage, $http) {

  var cardListPromise = getFileFromStorage.getFileList('saba_cards.json');

  cardListPromise.then(function(result) {
    var cards = result;
    $scope.card = $filterData.filterByUrlCardId(cards, parseInt($stateParams.cId))[0];
      console.log($scope.card);
  });

  var imageListPromise = getFileFromStorage.getFileList('saba_images.json');

  $scope.imgs = [];

  $scope.source = 'cdvfile://localhost/persistent/sabamestari/.images/sabamestari';

  imageListPromise.then(function(result) {
    var images = result;


    angular.forEach(images, function(value, key) {
      if (value.c_id === parseInt($stateParams.cId)) {
        $scope.imgs.push(value.image_name);
      };
    });
  });



    //Backup data
    
    var checkData = $http.get('cdvfile://localhost/persistent/sabamestari/.images/sabamestari/' + 'alku.PNG').success(function(success) {
      console.log("success");
      $scope.status = "works";
    })
    .error(function(data, status) {
      console.log(status);
      $scope.status = "404";
    });

    var backupData = $http.get('http://sabamestariadmin.org/json_files/sabamestari/saba_cards.php').then(function(success) {
      console.log(success.data);
       var backupCards = success.data;
       $scope.backupCard = $filterData.filterByUrlCardId(backupCards, parseInt($stateParams.cId))[0];

    });

    $scope.backupimgs = [];


    var backupImages = $http.get('http://sabamestariadmin.org/json_files/sabamestari/saba_images.php').then(function(success) {
      var backupImages = success.data;
      angular.forEach(backupImages, function(value, key) {
        if (value.c_id === parseInt($stateParams.cId)) {
          $scope.backupimgs.push(value.image_name);
        };
      });
    });





    var checkTablet = "This device is"+(window.isTablet?'':'NOT')+" a tablet";

    $scope.showModal = function() {    
      modal.show();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('landscape');
      }
    };

    $scope.showModal2 = function() {    
      modal2.show();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('landscape');
      }
    };

    $scope.hideModal = function() {
      modal.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };
    $scope.hideModal2 = function() {
      modal2.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };

    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown() {

      modal.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };


}]);