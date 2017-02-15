angular.module('myApp', ['ng-sortable']);

app.directive('dExpandCollapse', function() {

  return {
          restrict: 'EA',
          link: function(scope, element, attrs){
            
            $(element).find(".plan-heading").click( function() {
            	$(element).find(".plan-sortable-list").slideToggle('100',function(){});
			});
		  }
        };
});

app.controller('plannerCtrl', function($scope) {

	$scope.isDisabled = true;
   
   $scope.disableButton = function() {
        $scope.isDisabled = true;
    }
	
	$scope.enableButton = function() {
        $scope.isDisabled = false;
    }

	$(document).on('pageinit', function(event) {
	  var total = $('#usertotal');
	  $('select').on('change', function () {
		var tot = 0;
		$('select > option:selected').each(function () {
		  var selects = $(this).attr('value');
		  if (selects) {
			//console.log(selects);
			tot += Number(selects);
		  }
		});
		var final_result = tot;
		//console.log(final_result);
		total.html(final_result.toFixed(0));
	  }); 
	});
	
	$(document).ready(function() {	
		$('.plan-sortable-list').sortable({});
	});

});

app.controller('plannerCtrl', ['$scope', 'filterFilter', function plannerCtrl($scope, filterFilter) {
	
$scope.alkucards = [	{name:'first card', difficulty:1, selected: false},
					    {name:'another card', difficulty:1, selected: false},
					    {name:'card', difficulty:2, selected: false},
					    {name:'some card', difficulty:3, selected: false}	];

/*
$scope.items = 	selectedYleCardsJSON;		 	
		
if ({} === $scope.items) {
      $http.get('http://dev.mw.metropolia.fi/floorball/Admin_Page/json_files/pistemestari/piste_cards.php'
    ).success(function(data){
            $scope.ylecards = data;
      })
}					
*/


 $scope.ylecards = [ 	{name:'card', difficulty:1, selected: true},
					    {name:'beta card', difficulty:3, selected: false},
					    {name:'alfa', difficulty:2, selected: false},
					    {name:'gamma card', difficulty:1, selected: false}];


  $scope.selectYleCards = [];
  
  $scope.selectedYleCards = function selectedCards() {
    return filterFilter($scope.ylecards, { selected: true });
  };

  $scope.$watch('ylecards | filter:{selected:true}', function (nv) {
    $scope.selectYleCards = nv.map(function (card) {
      return card.name;
    });
  }, true);
  
  $scope.saveIt = function(){
  $scope.ylecards = angular.copy($scope.ylecards);
}
     var selectedYleCardsJSON = JSON.stringify($scope.ylecards);
	
}]);
