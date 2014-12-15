var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'templates/main.html',
		controller: 'mainController'
	})
	.when('/games/', {
		templateUrl: 'templates/games.html',
	})
	.when('/games/flashcards/', {
		templateUrl: 'templates/flashcard_game.html',
		controller: 'FlashCardController'
	})
});

mainApp.controller('mainController', function($scope) {
	$scope.title = "Hello, world!"
})