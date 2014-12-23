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
        cards.push({word: card, type: 'symbol', 
          slug: card.base_word.root_word + '-symbol'});
        cards.push({word: card, type: 'word',
          slug: card.base_word.root_word + '-word'});
      };
      return $scope.shuffle(cards);
  	 };

  	 $scope.setUpBoard = function () {
  	 	// body...
  	 };

  	 $scope.checkCards = function (card1, card2) {
      console.log(card1, card2);
      cardarr1 = card1.split('-');
      cardarr2 = card2.split('-');
      
      if (cardarr1[0] == cardarr2[0]) {
        console.log("They match!")
        $scope.removeCards(card1, card2)
      } else {
        console.log("Nope.")
      }
      $timeout(function () {
        $scope.showCards = [];
      }, 2000);

  	 };

  	 $scope.removeCards = function (card1, card2) {
  	 	$scope.hideCards.push(card1);
      $scope.hideCards.push(card2);
  	 	// Do we have two word cards?
  	 };

  	 $scope.removeCards = function (card1, card2) {
  	 	$scope.hideCards.push(card1);
      $scope.hideCards.push(card2);
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

     $scope.flipCard = function (card) {
       $scope.showCards.push(card.slug);
       if ($scope.showCards.length == 2) {
        $scope.checkCards($scope.showCards[0], $scope.showCards[1]);
       }
     };

  	var url = "http://127.0.0.1:8000/wordlists/json/1/";
  	$http.get(url)
  	 	.success(function (data) {
	  	   	$scope.wordlist = data;
	  	   	$scope.gameWon = false;
	  	   	$scope.cards = $scope.createCards();
	  	   	$scope.setUpBoard();
	  	   	$scope.playGame();
          $scope.showCards = []
          $scope.hideCards = []
	  	   	$scope.createCards();
  	 });

  }]);
