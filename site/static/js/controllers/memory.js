mainApp.controller('MemoryController', ['$scope', '$timeout', '$http',
  '$interval',  

  function ($scope, $timeout, $http, $interval) {

  	 $scope.playGame = function () {
  	 	// while gameWon == false...
  	 };

  	 $scope.createCards = function () {
  	 	// Get six random words from list

  	 	// For each word, one is pic, one is word

  	 	// Shuffle em.
  	 };

  	 $scope.setUpBoard = function () {
  	 	// body...
  	 };

  	 $scope.checkCards = function (card1, card2) {
  	 	// Do we have two word cards?

  	 	// Do we have two picture cards?

  	 	// Do the two cards match?
  	 };

  	 $scope.removeCards = function (card1, card2) {
  	 	// Remove the cards from the board.
  	 };

  	 $scope.addAction = function (action) {
  	 	// The player did something, so add it to the stack
  	 };

  	$scope.stopTimer = function () {
    	if ($scope.done) {
      		$interval.cancel($scope.stop);
      		$scope.stop = undefined;
    	}
  	};

  	$scope.startTimer = function () {
  		$scope.stop = $interval(function () {
    		if (!$scope.done) {
       			$scope.seconds++;
      		} else {
        		$scope.stopTimer();
      		}
    	}, 1000);}

  	 $scope.endGame = function () {
  	 	// Print out an end game screen and push the data to 
  	 	// the backend.
  	 };

  	var url = "http://127.0.0.1:8000/wordlists/json/1/";
  	$http.get(url)
  	 	.success(function (data) {
	  	   	$scope.wordlist = data;
	  	   	$scope.gameWon = false;
	  	   	$scope.createCards();
	  	   	$scope.setUpBoard();
	  	   	$scope.playGame();
  	 });

  }]);