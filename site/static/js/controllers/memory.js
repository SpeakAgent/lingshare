mainApp.controller('MemoryController', ['$scope', '$timeout', '$http',
  '$interval',  

  function ($scope, $timeout, $http, $interval) {

    $scope.shuffle = function(array) {
    var m = array.length,
      t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  	 $scope.playGame = function () {
  	 	// while gameWon == false...
  	 };

  	 $scope.createCards = function () {
      cards = []
      words = $scope.shuffle($scope.wordlist.words).slice(0,6);
      for (var i = words.length - 1; i >= 0; i--) {
        card = words[i];
        cards.push({word: card, type: 'symbol'});
        cards.push({word: card, type: 'word'});
      };
      return $scope.shuffle(cards);
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
	  	   	$scope.cards = $scope.createCards();
	  	   	$scope.setUpBoard();
	  	   	$scope.playGame();
  	 });

  }]);