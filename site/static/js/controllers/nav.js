mainApp.controller('NavController', 
	function($scope, User){
  		$scope.username = localStorage.getItem('username');
 	});