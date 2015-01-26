var mainApp = angular.module('mainApp', ['ngRoute', 'angular-jwt','ngAnimate']);

mainApp.config(function($routeProvider, $sceDelegateProvider,
    $httpProvider, jwtInterceptorProvider) {
    //    jwtInterceptorProvider.tokenGetter = function() {
    //    return localStorage.getItem('authToken');
    // }
    // $httpProvider.interceptors.push('jwtInterceptor');
	$routeProvider
	.when('/', {
		templateUrl: 'templates/main.html',
		controller: 'mainController'
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
		templateUrl: 'templates/wordlists.html',
		controller: 'WordListsController'
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
	.when('/login/', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	})
	.when('/games/memory/', {
		templateUrl: 'templates/memory.html',
		controller: 'MemoryController'
	})
	.when('/dashboard/', {
		templateUrl: 'templates/dashboard.html',
		controller: 'DashboardController'
	}).
	when('/wordlist/:id', {
		templateUrl: '/templates/wordlists.html'
	});

	$sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   // Allow loading from our assets domain.  Notice the difference between * and **.
   'http://127.0.0.1:8000/**']);
});

mainApp.controller('mainController', function($scope, $rootScope) {
	$scope.title = "Hello, world!";
	$rootScope.body_classes = "main"
});



mainApp.controller('GamesController', function($scope, $rootScope) {
	$rootScope.body_classes = "games"
})
