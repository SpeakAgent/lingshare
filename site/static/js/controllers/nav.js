mainApp.controller('NavController', 
	function($scope, $rootScope){
  		$scope.username = localStorage.getItem('username');
  		$rootScope.username = $scope.username;
 	});