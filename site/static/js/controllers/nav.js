mainApp.controller('NavController',
	function($scope, $rootScope, appConfig){
		$scope.basePath = appConfig.basePath
  		$scope.username = localStorage.getItem('username');
  		$rootScope.username = $scope.username;
 	});