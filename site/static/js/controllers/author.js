mainApp.controller('AuthorController', ['$scope', '$http', 
  '$rootScope', '$sce', 'jwtHelper', 'appConfig', '$routeParams',

	function ($scope, $http, $rootScope, $sce, jwtHelper, appConfig, $routeParams) {

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
					$scope.getWordList()
				})
				.error(function (data) {
					console.log("GOT AN ERROR");
			});
		}

		$scope.getWordList = function() {
			console.log("Using", $scope.wordlists)
			if ($routeParams.id) {
				for (var wl in $scope.wordlists) {
					if ($scope.wordlists[wl].pk == $routeParams.id) {
						$scope.wordlist = $scope.wordlists[wl];
						break;
					}
				}
			}}

		$scope.audio_url = function(path) {
			return $sce.trustAsResourceUrl(path);
		}
	}

])

mainApp.controller('WordPairController', ['$scope', '$http', 
  '$rootScope', '$sce', 'jwtHelper', 'appConfig', '$routeParams',

	function ($scope, $http, $rootScope, $sce, jwtHelper, appConfig, $routeParams) {

		$rootScope.body_classes = "author";

		$scope.username = localStorage.getItem('username');
		if ($routeParams.id) {
			req = {
				url: appConfig.backendURL + '/wordpairs/detail/' + $routeParams.id + '/',
				method: 'GET',
				headers: {
					Authorization: 'JWT ' + localStorage.getItem('authToken')
				}
			}
			$http(req)
				.success(function (data) {
          $scope.wordpair = data
				})
				.error(function (data) {
					console.log("GOT AN ERROR");
			});
		}

		$scope.audio_url = function(path) {
			return $sce.trustAsResourceUrl(path);
		}
	}

])

mainApp.controller('WordListAddController', ['$scope', '$http', 
  '$rootScope', '$sce', 'jwtHelper', 'appConfig', '$routeParams',

	function ($scope, $http, $rootScope, $sce, jwtHelper, appConfig, $routeParams) {

		$rootScope.body_classes = "author";

		$scope.step = 1;
		$scope.formData = {};

		$scope.username = localStorage.getItem('username');

		$scope.post_data = function (data) {
			console.log(data)
		}

		$scope.range = function (num) {
			console.log("num = ", num)
			return new Array(num);
		}

		$scope.submitStepOne = function () {
			console.log("Trying to post...")
			$scope.step = 2
			$scope.formData.words = Array($scope.formData.lex_num)
		}

		$scope.submitStepTwo = function () {
			$scope.step = 3

		}
	}

])