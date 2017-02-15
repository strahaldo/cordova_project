admin.controller('singlePlanDetailsCtrl', ['$scope', '$rootScope', '$stateParams', 'getFileFromStorage', '$http',
    function ($scope, $rootScope, $stateParams, getFileFromStorage, $http) {

        var selectedObject = $rootScope.selectedCards;
        angular.forEach(selectedObject, function (value, index) {

            angular.forEach(value.selected_images, function (value, index) {
                console.log(value.c_id);
                if ($stateParams.c_id == value.c_id) {
                    $scope.card = value;
                    console.log($scope.card);
                }
            });

        });


        var imageListPromise = getFileFromStorage.getFileList('saba_images.json');

        $scope.imgs = [];


        $scope.source = 'cdvfile://localhost/persistent/sabamestari/.images/sabamestari';

        imageListPromise.then(function(result) {
        var images = result;


        angular.forEach(images, function(value, key) {
        if (value.c_id === parseInt($stateParams.c_id)) {
            $scope.imgs.push(value.image_name);
        };
        });
        console.log($scope.source + "/" + $scope.imgs);
        });

    //Backup data
    
    var checkData = $http.get('cdvfile://localhost/persistent/sabamestari/.images/sabamestari/' + 'alku.PNG').success(function(success) {
      $scope.status = "works";
      console.log("success");
    })
    .error(function(data, status) {
      console.log(status);
      $scope.status = "404";
    });


    $scope.backupimgs = [];

    var backupImages = $http.get('http://sabamestariadmin.org/json_files/sabamestari/saba_images.php').then(function(success) {
      var backupImages = success.data;
      console.log(backupImages);
      angular.forEach(backupImages, function(value, key) {
        if (value.c_id === parseInt($stateParams.c_id)) {
          $scope.backupimgs.push(value.image_name);
          console.log(value.c_id);
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



admin.controller('singlePlanDetailsCtrlPiste', ['$scope', '$rootScope', '$stateParams', 'getFileFromStorage', '$http',
    function ($scope, $rootScope, $stateParams, getFileFromStorage, $http) {

        var selectedObject = $rootScope.selectedCardsPiste;
        angular.forEach(selectedObject, function (value, index) {

            angular.forEach(value.selected_images, function (value, index) {
                console.log(value.c_id);
                if ($stateParams.c_id == value.c_id) {
                    $scope.card = value;
                    console.log($scope.card);
                }
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


    $scope.backupimgs = [];

    var backupImages = $http.get('http://sabamestariadmin.org/json_files/pistemestari/piste_images.php').then(function(success) {
      var backupImages = success.data;
      console.log(backupImages);
      angular.forEach(backupImages, function(value, key) {
        if (value.c_id === parseInt($stateParams.c_id)) {
          $scope.backupimgs.push(value.image_name);
          console.log(value.c_id);
        };
      });
    });


        var imageListPromise = getFileFromStorage.getFileList('piste_images.json');

        $scope.imgs = [];

        $scope.source = 'cdvfile://localhost/persistent/sabamestari/.images/pistemestari';

        imageListPromise.then(function(result) {
        var images = result;


        angular.forEach(images, function(value, key) {
        if (value.c_id === parseInt($stateParams.c_id)) {
            $scope.imgs.push(value.image_name);
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