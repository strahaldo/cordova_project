app.controller('pisteCardCtrl', ['$scope',
                                 '$localstorage',
                                 'getFileFromStorage',
                                 'filterData',
                                 '$stateParams',
                                 '$http',
  function($scope, $localstorage, getFileFromStorage, $filterData, $stateParams, $http) {

  var cardListPromise = getFileFromStorage.getFileList('piste_cards.json');

  cardListPromise.then(function(result) {
    var cards = result;
    $scope.card = $filterData.filterByUrlCardId(cards, parseInt($stateParams.cId))[0];
  });

  var imageListPromise = getFileFromStorage.getFileList('piste_images.json');

  $scope.imgs = [];

  $scope.source = 'cdvfile://localhost/persistent/sabamestari/.images/pistemestari/';

  imageListPromise.then(function(result) {
    var images = result;


    angular.forEach(images, function(value, key) {
      if (value.c_id === parseInt($stateParams.cId)) {
        $scope.imgs.push(value.image_name);
      };
    });
  });


    //Backup data
    
    var checkData = $http.get('cdvfile://localhost/persistent/sabamestari/.images/pistemestari/' + 'alku.PNG').success(function(success) {
      console.log("success");
      $scope.status = "works";
    })
    .error(function(data, status) {
      console.log(status);
      $scope.status = "404";
    });

    var backupData = $http.get('http://sabamestariadmin.org/json_files/pistemestari/piste_cards.php').then(function(success) {
      console.log(success.data);
       var backupCards = success.data;
       $scope.backupCard = $filterData.filterByUrlCardId(backupCards, parseInt($stateParams.cId))[0];

    });

    $scope.backupimgs = [];


    var backupImages = $http.get('http://sabamestariadmin.org/json_files/pistemestari/piste_images.php').then(function(success) {
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
      modal2.hide2();
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