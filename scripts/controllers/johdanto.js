/**
 * Created by boochoo on 04/11/15.
 */

app.controller('johdantoCtrl', function($scope, getFileFromStorage){

    $scope.source = 'cdvfile://localhost/persistent/sabamestari/.images/sabamestari';

    var fileListPromise = getFileFromStorage.getFileList('johdanto.json');

    fileListPromise.then(function(result) {
      $scope.sections = result;
      console.log($scope.sections);
    });

});

app.controller('johSectionCtrl',['$scope', 'getFileFromStorage', 'filterData', '$stateParams', function($scope, getFileFromStorage, filterData, $stateParams) {
    var secListPromise = getFileFromStorage.getFileList('johdanto.json'); 


    secListPromise.then(function(result) {
      $scope.sections = result;
      $scope.sec = filterData.filterByUrlJohdaId($scope.sections, parseInt($stateParams.j_id))[0];

      $scope.rulesArray = [];
      $scope.cardsArray = [];

      $scope.source = "cdvfile://localhost/persistent/sabamestari/.images/johdanto";

      if ($scope.sec.icon == "rule") {
      var cardListPromise = getFileFromStorage.getFileList('johda_cards.json');
      cardListPromise.then(function(result){
        console.log("Rules without images");
        console.log(result);
        angular.forEach(result, function(value,index) {
            if (value.j_id == $scope.sec.j_id) {
                $scope.rulesArray.push(value);
            }
        });
        console.log($scope.rulesArray);
      });
      };

      if ($scope.sec.icon == "card") {

      var fileListPromise = getFileFromStorage.getFileList('johda_section.json');
      fileListPromise.then(function(result) { 
        angular.forEach(result, function(value,index) {
          console.log(value);
            if (value.j_id == $scope.sec.j_id) {
                $scope.cardsArray.push(value);

            }
        });
        console.log($scope.cardsArray);
      });

      };


      });

  var checkTablet = "This device is"+(window.isTablet?'':'NOT')+" a tablet";

    $scope.showModal1 = function() {    
      modal1.show();
    };

    $scope.hideModal1 = function() {
      modal1.hide();
    };

    $scope.showModal2 = function() {    
      modal2.show();
    };

    $scope.hideModal2 = function() {
      modal2.hide();
    };

    $scope.showModalPerus1 = function() {    
      modal1.show();
    };

    $scope.hideModalPerus1 = function() {
      modal1.hide();
    };

    $scope.showModalPerus2 = function() {    
      modal2.show();
    };

    $scope.hideModalPerus2 = function() {
      modal2.hide();
    };

    $scope.showModalPerus3 = function() {    
      modal3.show();
    };

    $scope.hideModalPerus3 = function() {
      modal3.hide();
    };

    $scope.showModalPerus4 = function() {    
      modal4.show();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('landscape');
      }
    };

    $scope.hideModalPerus4 = function() {
      modal4.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };

    $scope.showModalPerus5 = function() {    
      modal5.show();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('landscape');
      }
    };

    $scope.hideModalPerus5 = function() {
      modal5.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };

    $scope.showModalPerus6 = function() {    
      modal6.show();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('landscape');
      }
    };

    $scope.hideModalPerus6 = function() {
      modal6.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };

    $scope.showModalPerus7 = function() {    
      modal7.show();
    };

    $scope.hideModalPerus7 = function() {
      modal7.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };

    $scope.showModalPerus8 = function() {    
      modal8.show();
    };

    $scope.hideModalPerus8 = function() {
      modal8.hide();
    };

    $scope.showModalPerus9 = function() {    
      modal9.show();
    };

    $scope.hideModalPerus9 = function() {
      modal9.hide();
    };

    $scope.showModalPerus10 = function() {    
      modal10.show();
    };

    $scope.hideModalPerus10 = function() {
      modal10.hide();
    };

    $scope.showModalPerus11 = function() {    
      modal11.show();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('landscape');
      }
    };

    $scope.hideModalPerus11 = function() {
      modal11.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };

    $scope.showModalPerus12 = function() {    
      modal12.show();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('landscape');
      }
    };

    $scope.hideModalPerus12 = function() {
      modal12.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };

    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown() {
      modal1.hide();
      modal2.hide();
      modal3.hide();
      modal4.hide();
      modal5.hide();
      modal6.hide();
      modal7.hide();
      modal8.hide();
      modal9.hide();
      modal10.hide();
      modal11.hide();
      modal12.hide();
      if (checkTablet == "This device is a tablet") {
           screen.unlockOrientation();
      } else {
        screen.lockOrientation('portrait');
      }
    };



    }]);





app.directive('rmRead', function () {
    return {
        restrict:'AE',
        scope:{
            rmtext : '@',
            rmlimit : '@',
            rmfulltext:'@',
            rmMoreText:'@',
            rmLessText:'@',
            rmMoreClass:'@',
            rmLessClass:'@'
        },
        templateUrl: 'scripts/directives/readmore.html',
        controller : function($scope){
            $scope.toggleValue=function(){

                if($scope.rmfulltext == true)
                    $scope.rmfulltext=false;
                else if($scope.rmfulltext == false)
                    $scope.rmfulltext=true;
                else
                    $scope.rmfulltext=true;
            }
        }
    };
});
