mainApp.controller('AuthorController', ['$scope', '$http', 
  '$rootScope', '$sce', 'jwtHelper', 'appConfig',

  	function ($scope, $http, $rootScope, $sce, jwtHelper, appConfig) {

	    $rootScope.body_classes = "author";

	    $scope.username = localStorage.getItem('username');
		if ($scope.username) {
			req = {
				url: appConfig.backendURL + '/author/username/' + $scope.username + '/',
				method: 'GET',
				headers: {
					Authorization: 'JWT ' + localStorage.getItem('authToken')
				}
			}
			$http(req)
			    .success(function (data) {
			    	$scope.wordlists = data['wordlist_set']
			    	$scope.starred = data['starred_wl']
			    	console.log(data);
			    })
			    .error(function (data) {
	    			console.log("GOT AN ERROR");
	    	});
		}
  	}

])