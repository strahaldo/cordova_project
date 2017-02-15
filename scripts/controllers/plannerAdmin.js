var admin = angular.module('plannerAdmin', ['app', 'onsen', 'ui.router', 'as.sortable', 'dcbImgFallback']);


admin.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider
        .state('planner', {
            url: '/planner',
            controller: 'adminCtrl',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('planner.plan', {
            url: '/plan',
            controller: 'adminCtrl',
            onEnter: ['$rootScope', function ($rootScope) {
                $rootScope.app.menu.setMainPage('templates/menu/planner.html', {closeMenu: true});
            }]
        })
        .state('planner.planDetail', {
            url: '/planDetail/:title',
            controller: 'planDetailsCtrl',
            onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.myNavigator.pushPage('templates/planner/planDetails.html', {'title': $stateParams.title});
            }]
        })
        .state('planner.planDetail.singlePlanDetails', {
            url: '/singlePlanDetails/:c_id',
            controller: 'singlePlanDetailsCtrl',
            onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.myNavigator.pushPage('templates/planner/singlePlanDetails.html', {'c_id': $stateParams.c_id});
            }]
        })

        .state('planner.add', {
            url: '/add',
            controller: 'adminCtrl',
            onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.myNavigator.pushPage('templates/planner/addPlan.html', {'id': $stateParams.$id});
            }]
        })
        .state('planner.edit', {
            url: '/editPlan/:id',
            controller: 'editCtrl',
            onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.myNavigator.pushPage('templates/planner/editPlan.html', {'id': $stateParams.$id});
            }]
        })

        .state('plannerPiste', {
            url: '/plannerPiste',
            controller: 'adminCtrlPiste',
            abstract: true,
            template: '<ui-view/>'
        })
        .state('plannerPiste.plan', {
            url: '/planPiste',
            controller: 'adminCtrlPiste',
            onEnter: ['$rootScope', function ($rootScope) {
                $rootScope.app.menu.setMainPage('templates/menu/plannerPiste.html', {closeMenu: true});
            }]
        })
        .state('plannerPiste.planDetail', {
            url: '/planDetailPiste/:title',
            controller: 'planDetailsCtrlPiste',
            onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.myNavigator.pushPage('templates/planner/planDetailsPiste.html', {'title': $stateParams.title});
            }]
        })
        .state('plannerPiste.planDetail.singlePlanDetails', {
            url: '/singlePlanDetailsPiste/:c_id',
            controller: 'singlePlanDetailsCtrlPiste',
            onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.myNavigator.pushPage('templates/planner/singlePlanDetailsPiste.html', {'c_id': $stateParams.c_id});
            }]
        })
        .state('plannerPiste.planDetail.poinstmaster', {
          url: '/Pistemestari',
          onEnter: ['$rootScope', function($rootScope) {
            navigator.startApp.start("fi.metropolia.meng.mjk.pistemestari", function(message) { /* success */
              console.log(message); // => OK
            }, 
            function(error) { /* error */
              console.log(error);
              install();
              function install() {
                var r = confirm("Haluatko asentaa Pistemestari-sovelluksen?");
                if (r == true) {
                  cordova.plugins.market.open('fi.metropolia.meng.mjk.pistemestari');
                } else {
    
                }
              }
            });
            
          }]
        })
        .state('plannerPiste.add', {
            url: '/addPiste',
            controller: 'adminCtrlPiste',
            onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.myNavigator.pushPage('templates/planner/addPlanPiste.html', {'id': $stateParams.$id});
            }]
        })
        .state('plannerPiste.edit', {
            url: '/editPlanPiste/:id',
            controller: 'editCtrlPiste',
            onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                $rootScope.myNavigator.pushPage('templates/planner/editPlanPiste.html', {'id': $stateParams.$id});
            }]
        })


    $urlRouterProvider.otherwise('/planner');

});

admin.controller('adminCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', '$state', '$compile',
    function ($scope, $rootScope, $http, $location, $stateParams, $state, $compile) {


        $http.get('cdvfile://localhost/persistent/sabamestari/data/saba_cards.json').success(function(data){
            $rootScope.images = data;
        });

        $http.get('cdvfile://localhost/persistent/sabamestari/data/sabamestari.json').success(function(data){
            $rootScope.section = data;
        });

        console.log($rootScope.images);


        // Backup
        $http.get('http://sabamestariadmin.org/json_files/sabamestari/saba_cards.php').success(function(data){
            $rootScope.backupImages = data;
        });

        console.log($rootScope.backupImages);

        $http.get('http://sabamestariadmin.org/json_files/sections/sabamestari.php').success(function(data){
            $rootScope.backupSection = data;
        });

        console.log($rootScope.backupSection);

/*

            angular.forEach($rootScope.images, function(value, index){

                if(sec.s_id === value.c_id){
                    console.log(value);
                }
            });*/

        $scope.selected_images = [];

        //old values
        $rootScope.selectedCards = JSON.parse(localStorage.getItem('newAddedPlans')) || [];

        $scope.selectImage = function (image) {

            image.selected = !image.selected;

            if(image.selected) {
                $scope.selected_images.push(image);


                $("#new").append('<button class="button button--large--cta count_btn">' + image.title + '</button>');


            }


        };

        $scope.addPlan = function() {


            if ($scope.title) {var title = $scope.title;} else { var title = null;}
            if ($scope.selected) {var selected = $scope.selected;} else { var selected = null;}
            if ($scope.selected_images) { var selected_images = $scope.selected_images;} else {var selected_images = null;}


            if ( selected_images === undefined || selected_images.length == 0){

                swal({
                    title: "Valitse harjoitekortit",
                    type: "warning",
                    confirmButtonColor: "#DD6B55"

                });

            }else if (!$scope.title){

                swal({
                    title: "Anna harjoitukselle otsikko",
                    type: "warning",
                    confirmButtonColor: "#DD6B55"

                });

            }else{
                var newAdded = {
                    title: title,
                    selected_images: $scope.selected_images
                };

                $scope.selectedCards.push(newAdded);

                localStorage.setItem('newAddedPlans', JSON.stringify($scope.selectedCards));

                clearFields();
                $state.go('planner.plan');

                swal({
                    title: "Suunnitelmasi on tallennettu!"


                });
            }
            console.log(selected_images);

        };

        /*function stopRKey(evt) {
            var evt = (evt) ? evt : ((event) ? event : null);
            var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
            if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
        }

        document.onkeypress = stopRKey;*/

        function clearFields() {

            //console.log('clearing everything after addPlan()...');

            $scope.title = '';
            $scope.selected_images = [];

        }


    }]);



admin.controller('adminCtrlPiste', ['$scope', '$rootScope', '$http', '$location', '$stateParams', '$state',
    function ($scope, $rootScope, $http, $location, $stateParams, $state) {


        var pointsMaster = {
            title: "Pelaa Pistemestaria",
            c_id: 453,
            image_dir: "assets/img/pistemestari_logo.png",
            p_id: 0
        };

        $http.get('cdvfile://localhost/persistent/sabamestari/data/piste_cards.json').success(function(data){
            $rootScope.imagesPiste = data;
            $rootScope.imagesPiste.unshift(pointsMaster);
            console.log($rootScope.imagesPiste);
        });

        $http.get('cdvfile://localhost/persistent/sabamestari/data/pistemestari.json').success(function(data){
            $rootScope.sectionPiste = data;
        });

        // Backup
        $http.get('http://sabamestariadmin.org/json_files/pistemestari/piste_cards.php').success(function(data){
            $rootScope.backupImages = data;
            $rootScope.backupImages.unshift(pointsMaster);
            console.log($rootScope.backupImages);
        });

        console.log($rootScope.backupImages);

        $http.get('http://sabamestariadmin.org/json_files/sections/pistemestari.php').success(function(data){
            $rootScope.backupSection = data;
        });

        console.log($rootScope.backupSection);



/*

            angular.forEach($rootScope.images, function(value, index){

                if(sec.s_id === value.c_id){
                    console.log(value);
                }
            });*/

        $scope.selected_images = [];
        $scope.cardOrder = [];

        //old values
        $rootScope.selectedCardsPiste = JSON.parse(localStorage.getItem('newAddedPlansPiste')) || [];

        $scope.selectImage = function (image) {

            console.log(image.image_dir);


            image.selected = !image.selected;
            //console.log(image);
            //console.log(image.selected);

            if(image.selected) {
                $scope.selected_images.push(image);

                $("#new").append('<button class="button button--large--cta count_btn">' + image.title + '</button>');

                //$scope.cardOrder.push(image.title);
            }/*else{
                for( var i=0; i<$scope.selected_images.length; i++) {
                    if( $scope.selected_images[i].c_id == image.c_id )
                        $scope.selected_images.splice(i,1);
                }

                for( var i=0; i<$scope.cardOrder.length; i++) {
                    if( $scope.cardOrder[i] === image.title )
                        console.log($scope.cardOrder[i]);
                        console.log("Index: ", i);
                        console.log(image.title);
                        $scope.cardOrder.splice(i,1);
                }
            }*/
        };


        $scope.addPlan = function() {


            if ($scope.title) {var title = $scope.title;} else { var title = null;}
            if ($scope.selected) {var selected = $scope.selected;} else { var selected = null;}
            if ($scope.selected_images) { var selected_images = $scope.selected_images;} else {var selected_images = null;}


            if ( selected_images === undefined || selected_images.length == 0){

                swal({
                    title: "Valitse harjoitekortit",
                    type: "warning",
                    confirmButtonColor: "#DD6B55"

                });

            }else if (!$scope.title){

                swal({
                    title: "Anna harjoitukselle otsikko",
                    type: "warning",
                    confirmButtonColor: "#DD6B55"

                });

            }else{
                var newAdded = {
                    title: title,
                    selected_images: $scope.selected_images
                };

                $scope.selectedCardsPiste.push(newAdded);

                localStorage.setItem('newAddedPlansPiste', JSON.stringify($scope.selectedCardsPiste));

                clearFields();
                $state.go('plannerPiste.plan');

                swal({
                    title: "Suunnitelmasi on tallennettu!"


                });
            }
            console.log(selected_images);

        };

        /*function stopRKey(evt) {
            var evt = (evt) ? evt : ((event) ? event : null);
            var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
            if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
        }

        document.onkeypress = stopRKey;*/

        function clearFields() {

            //console.log('clearing everything after addPlan()...');

            $scope.title = '';
            $scope.selected_images = [];

        }


    }]);


