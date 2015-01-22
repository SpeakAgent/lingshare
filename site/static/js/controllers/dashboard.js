mainApp.controller('DashboardController', function($scope, $rootScope, $http) {
	$scope.title = "My Dashboard";
	$rootScope.body_classes = "dashboard"

	// Get the user
	$scope.username = localStorage.getItem('username');
	req = {
		url: 'http://127.0.0.1:8000/user/username/' + $scope.username + '/',
		method: 'GET',
		headers: {
			Authorization: 'JWT ' + localStorage.getItem('authToken')
		}
	}
  $http(req)
    .success(function(data) {
      $rootScope.user = data;
      console.log(data)
    })
    .error(function (data) {
    	console.log(data);
    });


});