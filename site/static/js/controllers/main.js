var mainApp = angular.module('mainApp', ['ngRoute', 'angular-jwt']);

mainApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/main.html',
		controller: 'mainController'
	})
	.when('/words/', {
		templateUrl: 'templates/wordlists.html',
		controller: 'WordListsController'
	})
	.when('/words/word/:id', {
		templateUrl: 'templates/word_detail.html',
		controller: 'WordsController'
	})
	.when('/words/:id/', {
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
});

mainApp.controller('mainController', function($scope, $rootScope) {
	$scope.title = "Hello, world!";
	$rootScope.body_classes = "main"
});

mainApp.controller('GamesController', function($scope, $rootScope) {
	$rootScope.body_classes = "games"
})
