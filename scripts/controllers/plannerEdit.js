/**
 * Created by boochoo on 14/12/15.
 */
admin.controller('editCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$state',

    function ($scope, $rootScope, $stateParams, $http, $state) {


        //console.log($rootScope.planTitle);
        //console.log($rootScope.planData);
        //console.log($rootScope.selectedCards);

        angular.forEach($rootScope.selectedCards, function (value, index) {
            if (value.title == $rootScope.planTitle) {
                $rootScope.tit = value.selected_images;
            }
        });


        $http.get('cdvfile://localhost/persistent/sabamestari/data/saba_cards.json').success(function (data) {
            $scope.images = data;
        });

        // Backup
        $http.get('http://sabamestariadmin.org/json_files/sabamestari/saba_cards.php').success(function(data){
            $rootScope.backupImages = data;
        });




        $scope.title = $rootScope.planTitle;

        /* var selectedObject = $rootScope.selectedCards;
         var planId;

         for (var i = 0; i < selectedObject.length; i++) {

         var checkTitle = selectedObject[i].title;

         if (checkTitle == $stateParams.title) {

         $scope.plan = selectedObject[i];
         $scope.selected_images = $scope.plan.selected_images;
         planId = i;

         }
         }*/

        $scope.selected_images = [];
        var selected_index = -1;

        //old values
        $rootScope.selectedCards = JSON.parse(localStorage.getItem('newAddedPlans')) || [];


        $scope.editImage = function (image) {

            image.selected = !image.selected;

            if (image.selected) {
                $scope.selected_images.push(image);

                $("#new").append('<button class="button button--large--cta count_btn">' + image.title + '</button>');



            } else {
                for (var i = 0; i < $scope.selected_images.length; i++) {
                    if ($scope.selected_images[i].c_id = image.c_id)
                        $scope.selected_images.splice(i, 1);
                }
            }

        };

        //console.log($scope.selected_images);

        $scope.editPlan = function () {

            /*
             var allData =  JSON.parse(localStorage.getItem('newAddedPlans'));
             */

            if ($scope.title) {
                var title = $scope.title;
            } else {
                var title = null;
            }
            if ($scope.selected) {
                var selected = $scope.selected;
            } else {
                var selected = null;
            }
            if ($scope.selected_images) {
                var selected_images = $scope.selected_images;
            } else {
                var selected_images = null;
            }


            if (selected_images === undefined || selected_images.length == 0) {

                swal({
                    title: "Select cards",
                    type: "warning",
                    confirmButtonColor: "#DD6B55"

                });

            } else {
                $scope.combinedAdded = [];


                $scope.newAddedCards = {
                    title : $rootScope.planTitle,
                    selected_images: $scope.selected_images
                };

                angular.forEach($scope.newAddedCards, function (value, key) {
                    $rootScope.newTitles = value;
                });

                $scope.combinedAdded = $rootScope.tit.concat($rootScope.newTitles);

                angular.forEach($rootScope.selectedCards, function(value, index) {
                    if (value.title == $scope.title) {
                        var index = value.selected_images;
                        // combination of the old added values with the new added values
                        var combo = $scope.combinedAdded;

                        if (index !== -1 ) {

                            /* for( var i=0; i<combo.length; i++) {
                             console.log('index', index);
                             console.log('combo', $scope.combinedAdded);
                             if( index[i].c_id !== combo[i].c_id )
                             console.log('index c_id', index[i].c_id);
                             console.log('combo.c_id ', combo[i].c_id );*/

                            value.selected_images = $scope.combinedAdded;


                        }
                    }
                });

                console.log("All Cards", $rootScope.selectedCards);

                localStorage.setItem('newAddedPlans', JSON.stringify($scope.selectedCards));

                swal("Suunnitelma päivitetty!")

                $state.go('planner.plan');
            }


        }
    }
]);



admin.controller('editCtrlPiste', ['$scope', '$rootScope', '$stateParams', '$http', '$state',

    function ($scope, $rootScope, $stateParams, $http, $state) {


        //console.log($rootScope.planTitlePiste);
        //console.log($rootScope.planData);
        //console.log($rootScope.selectedCardsPiste);
        //
        var pointsMaster = {
            title: "Pelaa Pistemestaria",
            c_id: 453,
            image_dir: "assets/img/pistemestari_logo.png",
            p_id: 0
        };

        angular.forEach($rootScope.selectedCardsPiste, function (value, index) {
            if (value.title == $rootScope.planTitlePiste) {
                $rootScope.titPiste = value.selected_images;
            }
        });


        $http.get('cdvfile://localhost/persistent/sabamestari/data/piste_cards.json').success(function (data) {
            $scope.imagesPiste = data;
            $scope.imagesPiste.unshift(pointsMaster);
        });


        // Backup
        $http.get('http://sabamestariadmin.org/json_files/pistemestari/piste_cards.php').success(function(data){
            $rootScope.backupImages = data;
            $scope.backupImages.unshift(pointsMaster);
        });




        $scope.title = $rootScope.planTitlePiste;

        console.log($scope.title);

        /* var selectedObject = $rootScope.selectedCards;
         var planId;

         for (var i = 0; i < selectedObject.length; i++) {

         var checkTitle = selectedObject[i].title;

         if (checkTitle == $stateParams.title) {

         $scope.plan = selectedObject[i];
         $scope.selected_images = $scope.plan.selected_images;
         planId = i;

         }
         }*/

        $scope.selected_images = [];
        var selected_index = -1;

        //old values
        $rootScope.selectedCardsPiste = JSON.parse(localStorage.getItem('newAddedPlansPiste')) || [];


        $scope.editImage = function (image) {

            image.selected = !image.selected;

            if (image.selected) {
                $scope.selected_images.push(image);

                $("#new").append('<button class="button button--large--cta count_btn">' + image.title + '</button>');

            }/* else {
                for (var i = 0; i < $scope.selected_images.length; i++) {
                    if ($scope.selected_images[i].c_id = image.c_id)
                        $scope.selected_images.splice(i, 1);
                }
            }*/

        };

        //console.log($scope.selected_images);

        $scope.editPlan = function () {

            /*
             var allData =  JSON.parse(localStorage.getItem('newAddedPlans'));
             */

            if ($scope.title) {
                var title = $scope.title;
            } else {
                var title = null;
            }
            if ($scope.selected) {
                var selected = $scope.selected;
            } else {
                var selected = null;
            }
            if ($scope.selected_images) {
                var selected_images = $scope.selected_images;
            } else {
                var selected_images = null;
            }


            if (selected_images === undefined || selected_images.length == 0) {

                swal({
                    title: "Select cards",
                    type: "warning",
                    confirmButtonColor: "#DD6B55"

                });

            } else {
                $scope.combinedAdded = [];


                $scope.newAddedCards = {
                    title : $rootScope.planTitlePiste,
                    selected_images: $scope.selected_images
                };

                angular.forEach($scope.newAddedCards, function (value, key) {
                    $rootScope.newTitlesPiste = value;
                    //console.log("newTitles ", value);
                });

                //console.log('the newly added ', $rootScope.newTitles);
                //console.log('the old added ', $rootScope.tit);

                $scope.combinedAdded = $rootScope.titPiste.concat($rootScope.newTitlesPiste);

                console.log($scope.combinedAdded);

                //$rootScope.selectedCards.push($scope.combinedAdded);

                angular.forEach($rootScope.selectedCardsPiste, function(value, index) {
                    if (value.title == $scope.title) {
                        var index = value.selected_images;
                        if (index !== -1) {
                            value.selected_images = $scope.combinedAdded;
                        }
                        //value.selected_images.push($scope.combinedAdded);
                    }
                });

                //console.log("Combined", $scope.combinedAdded);

                console.log("All Cards", $rootScope.selectedCardsPiste);
                localStorage.setItem('newAddedPlansPiste', JSON.stringify($scope.selectedCardsPiste));




                console.log("Combo", $rootScope.selectedCardsPiste);

                console.log("New planner", $rootScope.selectedCardsPiste);

                swal({
                    title: "Suunnitelma päivitetty!"
                });

                $state.go('plannerPiste.plan');
                //$rootScope.planTitlePiste
                //$state.go('plannerPiste.planDetail/:title', { title: $rootScope.planTitlePiste});
            }

        }
    }
]);

admin.filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});
