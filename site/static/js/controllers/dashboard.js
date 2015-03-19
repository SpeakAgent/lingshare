mainApp.controller('DashboardController', function($scope, $rootScope, 
	$http, appConfig) {
	$scope.title = "My Dashboard";
	$rootScope.body_classes = "dashboard"

	$scope.basePath = appConfig.basePath;

	// Get the user
	$scope.username = localStorage.getItem('username');
	if ($scope.username) {
	req = {
		url: appConfig.backendURL + '/user/username/' + $scope.username + '/',
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
}


});