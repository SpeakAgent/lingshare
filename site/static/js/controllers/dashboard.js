mainApp.controller('DashboardController', function($scope, $rootScope, $http) {
	$scope.title = "My Dashboard";
	$rootScope.body_classes = "dashboard"

	// Get the user
	$scope.username = localStorage.getItem('username');
	var url = "http://127.0.0.1:8000/user/username/"
  $http.get(url + $scope.username)
    .success(function(data) {
      $scope.user = data;
    });


});