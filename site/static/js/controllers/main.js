
var appConfig = angular.module('appConfig', []).constant('appConfig', {
  'basePath': '/lingshare-dev',
  'backendURL': 'http://127.0.0.1:8000'
})

var mainApp = angular.module('mainApp', ['ngRoute', 'angular-jwt','ngAnimate', 'appConfig']);

mainApp.config(function($routeProvider, $sceDelegateProvider,
    $httpProvider, jwtInterceptorProvider) {
    //    jwtInterceptorProvider.tokenGetter = function() {
    //    return localStorage.getItem('authToken');
    // }
    // $httpProvider.interceptors.push('jwtInterceptor');

	$routeProvider
	.when('/', {
		templateUrl: 'templates/dashboard.html',
		controller: 'DashboardController'
	})
	.when('/words/', {
		templateUrl: 'templates/wordlists.html',
		controller: 'WordListsController'
	})
	.when('/wordpair/:id/', {
		templateUrl: 'templates/wordpair.html',
		controller: 'WordPairController'
	})
	.when('/words/word/:id', {
		templateUrl: 'templates/word_detail.html',
		controller: 'WordsController'
	})
	.when('/words/:id/', {
		templateUrl: 'templates/wordreview.html',
		controller: 'WordReviewController'
	})
	.when('/words/:id/:wordID/', {
		templateUrl: 'templates/wordlists.html',
		controller: 'WordListsController'
	})
	.when('/games/', {
		templateUrl: 'templates/games.html',
		controller: 'GamesController'
	})
	.when('/games/flashcards/', {
		templateUrl: 'templates/flashcard_game.html',
		controller: 'FlashCardController'
	})
	.when('/games/flashcards/:id/', {
		templateUrl: 'templates/flashcard_game.html',
		controller: 'FlashCardController'
	})
	.when('/games/wordreview/:id/', {
		templateUrl: 'templates/wordreview.html',
		controller: 'WordReviewController'
	})
	.when('/login/', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	})
	.when('/games/memory/', {
		templateUrl: 'templates/memory.html',
		controller: 'MemoryController'
	})
	.when('/games/memory/:id/', {
		templateUrl: 'templates/memory.html',
		controller: 'MemoryController'
	})
	.when('/dashboard/', {
		templateUrl: 'templates/dashboard.html',
		controller: 'DashboardController'
	})
	.when('/wordlist/:id', {
		templateUrl: '/templates/wordlists.html'
	})
	.when('/trophies/', {
		templateUrl: 'templates/trophies.html',
		controller: 'TrophiesController'
	})
	.when('/author/', {
		templateUrl: 'templates/author.html',
		controller: 'AuthorController'
	})
	.when('/author/wordlists/', {
		templateUrl: 'templates/author_wordlists.html',
		controller: 'AuthorController'
	})
	.when('/author/wordlist/add/', {
		templateUrl: 'templates/author_wordlist_add.html',
		controller: 'WordListAddController'
	})
	.when('/author/wordlists/:id', {
		templateUrl: 'templates/author_wordlist.html',
		controller: 'AuthorController'
	})
	.when('/author/wordpairs/:id', {
		templateUrl: 'templates/author_wordpair.html',
		controller: 'WordPairController'
	})
	;

	$sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   // Allow loading from our assets domain.  Notice the difference between * and **.
   'http://127.0.0.1:8000/**']);
});

mainApp.controller('mainController', function($scope, $rootScope) {
	$scope.title = "Hello, world!";
	$rootScope.body_classes = "main"

	// Use this value to track # of seconds the app's been running
	// TO DO: Send app ended events when window close; not sure how best
	// to do that yet.
	$rootScope.appLaunched = $rootScope.appLaunched || new Date().valueOf();

  mixpanel.track("application launched");

});



mainApp.controller('GamesController', function($scope, $rootScope, $http, appConfig) {
	$scope.basePath = appConfig.basePath
	$rootScope.body_classes = "games";
	$scope.username = localStorage.getItem('username');
	if ($scope.username) {
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
      })
	}
})
