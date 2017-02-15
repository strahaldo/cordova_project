admin.controller('planDetailsCtrl', ['$scope', '$rootScope', '$stateParams', '$state',
    function ($scope, $rootScope, $stateParams, $state) {



        //nsole.log($stateParams.title);
        //console.log($rootScope.selectedCards);

        $rootScope.planTitle = $stateParams.title;
        $rootScope.planData = $rootScope.selectedCards;

        var selectedObject = $rootScope.selectedCards;
        var planId;
        $rootScope.singleCard = [];


        for (var i = 0; i < selectedObject.length; i++) {

            var checkTitle = selectedObject[i].title;

            if (checkTitle == $stateParams.title) {

                $scope.plan = selectedObject[i];
                $scope.selected_images = $scope.plan.selected_images;
                planId = i;

            }
        }

        $scope.total = 0;

        $scope.getTotalTime = function() {
            $scope.total = 0;
            $scope.selected_images.forEach(function(selected_image) {
                $scope.total += parseInt(selected_image.getTotal, 10) || 0;
            });
        }


            $scope.timeList = [];


            angular.forEach($scope.selected_images, function (selected_image, key) {
                $scope.total = $scope.total + selected_image.getTotal;
                $scope.timeList.push({"card": selected_image.title, "time": selected_image.getTotal});
                // return $scope.total + 'min.';
            });



            angular.forEach($rootScope.selectedCards, function(plans, key) {
                if ($stateParams.title == plans.title) {
                    console.log(plans.title);
                    for (var attr in $scope.timeList) {
                       plans.selected_images[attr].time = $scope.timeList[attr].time;
                       //console.log(plans.selected_images[attr]);
                       //console.log($scope.timeList[attr]);
                    }
                }
            });

























        $scope.removeCard = function (i) {

            swal({
                title: "Haluatko varmasti poistaa harjoitteen?",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Poista harjoitus!",
                cancelButtonText: "Peruuta",
                closeOnConfirm: false

            }, function () {

                console.log($scope.selected_images);

                $scope.selected_images.splice(i, 1);
                localStorage.setItem('newAddedPlans', JSON.stringify(selectedObject));

                console.log($scope.selected_images);

                $state.reload();

                swal("Harjoituksesi on poistettu!");
            });
        }

        $scope.removePlan = function () {

            swal({
                title: "Haluatko varmasti poistaa harjoitteen?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Poista",
                cancelButtonText: "Peruuta",
                closeOnConfirm: false
            }, function () {
                selectedObject.splice(planId, 1);
                localStorage.setItem('newAddedPlans', JSON.stringify(selectedObject));

                $state.go('planner.plan');
                swal("Harjoituksesi on poistettu!");
            });

        }

        $scope.instruct = function(){
            swal({
                title: 'Ohjeet',
                html:   ' <span style="color: cadetblue; font-family: FontAwesome;">Paina harjoitteen otsikkoa nähdäksesi lisätietoja </span> <br>    ' +
                '<span style="color: ##00bcd4; font-family: FontAwesome;">Määrittele harjoitteelle aika harjoiterivin tekstiruutuun. Näet harjoituksen kokonaisajan vasemmassa alakulmassa. </span> <br>' +
                '<span style="color: indianred; font-family: FontAwesome;">Voit poistaa joko yksittäisen harjoitteen tai koko harjoituksen </span><br>' +
                '<span style="color: royalblue; font-family: FontAwesome;">Valitse ”Muokkaa” lisätäksesi harjoitteita suunnitelmaasi</span> ',
                confirmButtonColor: '#987463',
                confirmButtonText: 'Sulje',
                width: 400,
                padding: 10
            });
        };


        $scope.totalPlan = function () {
            $scope.total = 0;
            $scope.timeList = [];


            console.log("Saved plans:");
            console.log($rootScope.selectedCards);



            angular.forEach($scope.selected_images, function (selected_image, key) {
                $scope.total = $scope.total + selected_image.getTotal;
                $scope.timeList.push({"card": selected_image.title, "time": selected_image.getTotal});
                // return $scope.total + 'min.';
            });



            angular.forEach($rootScope.selectedCards, function(plans, key) {
                if ($stateParams.title == plans.title) {
                    console.log(plans.title);
                    for (var attr in $scope.timeList) {
                       plans.selected_images[attr].time = $scope.timeList[attr].time;
                       //console.log(plans.selected_images[attr]);
                       //console.log($scope.timeList[attr]);
                    }
                }
            });

            console.log($scope.timeList);

            localStorage.setItem('newAddedPlans', JSON.stringify($rootScope.selectedCards));

            console.log("Saved plans with Time:");
            console.log($rootScope.selectedCards);

        }

    }]);





admin.controller('planDetailsCtrlPiste', ['$scope', '$rootScope', '$stateParams', '$state',
    function ($scope, $rootScope, $stateParams, $state) {

        $rootScope.selectedCardsPiste = JSON.parse(localStorage.getItem('newAddedPlansPiste')) || [];

        console.log($rootScope.selectedCardsPiste);

        //console.log($stateParams.title);
        //console.log($rootScope.selectedCards);

        $rootScope.planTitlePiste = $stateParams.title;

        var selectedObject = $rootScope.selectedCardsPiste;
        var planId;
        $scope.total = 0;
        $rootScope.singleCardPiste = [];

        //console.log(selectedObject);


        for (var i = 0; i < selectedObject.length; i++) {

            var checkTitle = selectedObject[i].title;

            if (checkTitle == $stateParams.title) {

                $scope.plan = selectedObject[i];
                $scope.selected_images = $scope.plan.selected_images;
                planId = i;

            }
        }


        $rootScope.timeListPiste = JSON.parse(localStorage.getItem('timePlan')) || [];

        console.log($rootScope.timeListPiste);


        $scope.total = 0;

        $scope.getTotalTime = function() {
            $scope.total = 0;
            $scope.selected_images.forEach(function(selected_image) {
                $scope.total += parseInt(selected_image.getTotal, 10) || 0;
            });
        }

        $scope.removeCard = function (i) {

            swal({
                title: "Haluatko varmasti poistaa harjoitteen?",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Poista harjoitus",
                cancelButtonText: "Peruuta",
                closeOnConfirm: false

            }, function () {

                $scope.selected_images.splice(i, 1);
                localStorage.setItem('newAddedPlansPiste', JSON.stringify(selectedObject));

                $state.reload();

                swal("Harjoituksesi on poistettu!");
            });
        }

        $scope.removePlan = function () {

            swal({
                title: "Haluatko varmasti poistaa harjoitteen?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Poista",
                cancelButtonText: "Peruuta",
                closeOnConfirm: false
            }, function () {
                selectedObject.splice(planId, 1);
                localStorage.setItem('newAddedPlansPiste', JSON.stringify(selectedObject));

                $state.go('plannerPiste.plan');
                swal("Harjoituksesi on poistettu!");
            });

        }

        $scope.instruct = function(){
            swal({
                title: 'Ohjeet',
                html:   ' <span style="color: cadetblue; font-family: FontAwesome;">Paina harjoitteen otsikkoa nähdäksesi lisätietoja </span> <br>    ' +
                '<span style="color: ##00bcd4; font-family: FontAwesome;">Määrittele harjoitteelle aika harjoiterivin tekstiruutuun. Näet harjoituksen kokonaisajan vasemmassa alakulmassa. </span> <br>' +
                '<span style="color: indianred; font-family: FontAwesome;">Voit poistaa joko yksittäisen harjoitteen tai koko harjoituksen </span><br>' +
                '<span style="color: royalblue; font-family: FontAwesome;">Valitse ”Muokkaa” lisätäksesi harjoitteita suunnitelmaasi</span> ',
                confirmButtonColor: '#987463',
                confirmButtonText: 'Sulje',
                width: 400,
                padding: 10
            });
        };

        $scope.totalPlan = function () {
            $scope.total = 0;
            $scope.timeList = [];

            //var allPlans =  JSON.parse(localStorage.getItem('newAddedPlansPiste'));

            //console.log(allPlans)
            //
            console.log("Saved plans:");
            console.log($rootScope.selectedCardsPiste);


            //localStorage.setItem('newAddedPlansPiste', JSON.stringify($scope.selectedCardsPiste));
            //
            //



            angular.forEach($scope.selected_images, function (selected_image, key) {
                $scope.total = $scope.total + selected_image.getTotal;
                $scope.timeList.push({"card": selected_image.title, "time": selected_image.getTotal});
                // return $scope.total + 'min.';
            });



            angular.forEach($rootScope.selectedCardsPiste, function(plans, key) {
                if ($stateParams.title == plans.title) {
                    console.log(plans.title);
                    for (var attr in $scope.timeList) {
                       plans.selected_images[attr].time = $scope.timeList[attr].time;
                       //console.log(plans.selected_images[attr]);
                       //console.log($scope.timeList[attr]);
                    }
                }
            });

            localStorage.setItem('newAddedPlansPiste', JSON.stringify($rootScope.selectedCardsPiste));

            console.log("Saved plans with Time:");
            console.log($rootScope.selectedCardsPiste);

        }



    }]);