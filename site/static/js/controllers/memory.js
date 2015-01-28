mainApp.controller('MemoryController', ['$scope', '$timeout', '$http',
  '$interval','$rootScope', '$sce',

  function ($scope, $timeout, $http, $interval, $rootScope, $sce) {

  $rootScope.body_classes = "games matching"


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
      $scope.totalCards = words.length * 2;
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

     $scope.sendScore = function () {
      // Need to get our current activity before getting
      // the score. Unique to activity and user
      req = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/activity/single/get/',
        data: {
          username: localStorage.getItem('username'),
          activity: 'Matching',
        },
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('authToken'),
        }
      }
      $http(req)
        .success(function (data) {
          req = {
            method: 'POST',
            url: 'http://127.0.0.1:8000/score/add/',
            data: {
              username: localStorage.getItem('username'),
              activity_pk: data['pk'],
              score: $scope.score,
            },
            headers: {
              Authorization: 'JWT ' + localStorage.getItem('authToken'),
            }
          }
          $http(req).success(function (data) {

          })
          .error(function (data) {

          });
        })
        .error(function (data) {

        })
       }

  	 $scope.checkCards = function (card1, card2) {
      cardarr1 = card1.split('-');
      cardarr2 = card2.split('-');

      if (cardarr1[0] == cardarr2[0]) {
        $scope.status = "They match!";
        $scope.play = cardarr1[0];
        $scope.correct++;
        $scope.score += 5;
        $scope.removeCards(card1, card2)
        console.log("Score", $scope.score)
        mixpanel.track("lexeme event", {
          activity :  "matching",
          match : true,
          lexeme : cardarr1[0],
          card_type : cardarr1[1],
          lexeme_pair: cardarr2[0],
          seconds : $scope.seconds,
        });
        mixpanel.track("lexeme event", {
          activity :  "matching",
          lexeme : cardarr2[0],
          card_type : cardarr2[1],
          lexeme_pair: cardarr1[0],
          match : true,
          seconds : $scope.seconds,
        });
      } else {
        $scope.status = "Those don't match...";
        $scope.wrong++;
        $timeout(function () {
        $scope.showCards = [];
        $scope.status = "";
        mixpanel.track("lexeme event", {
          activity :  "matching",
          match : false,
          lexeme : cardarr1[0],
          card_type : cardarr1[1],
          lexeme_pair: cardarr2[0],
          seconds : $scope.seconds,
        });
        mixpanel.track("lexeme event", {
          activity :  "matching",
          lexeme : cardarr2[0],
          card_type : cardarr2[1],
          lexeme_pair: cardarr1[0],
          match : false,
          seconds : $scope.seconds,
        });
      }, 1000);
      }
      if ($scope.hideCards.length == $scope.cards.length - 2) {
        $timeout(function () {
          $scope.done = true;
        }, 1000)
        $scope.sendScore();
      }
  	 };

  	 $scope.removeCards = function (card1, card2) {
      $timeout(function () {
        $scope.hideCards.push(card1);
        $scope.hideCards.push(card2);
        $scope.showCards = [];
        $scope.status = "";
      }, 1000)

  	 	// Do we have two word cards?
  	 };

  	 $scope.addAction = function (action) {
  	 	// The player did something, so add it to the stack
  	 };

  	$scope.stopTimer = function () {
    	if ($scope.done) {
      		$interval.cancel($scope.stop);
          mixpanel.track("timer end", {
            activity: "matching",
            seconds: $scope.seconds,
          });
      		$scope.stop = undefined;
    	}
  	};

  	$scope.startTimer = function () {
      mixpanel.track("timer start", {
        activity: "matching"
      });
  		$scope.stop = $interval(function () {
    		if (!$scope.done) {
       			$scope.seconds++;
      		} else {
        		$scope.stopTimer();
            $scope.activityCompleted();
      		}
    	}, 1000);}

  	 $scope.endGame = function () {
  	 	// Print out an end game screen and push the data to
  	 	// the backend.
     };

     $scope.activityCompleted = function () {
      mixpanel.track("activity complete", {
        activity: "matching",
        game_won : $scope.gameWon,
        correct : $scope.correct,
        wrong : $scope.wrong,
        elapsed: $scope.seconds,
        score : $scope.score,
        wordlist_id : $scope.wordlist["pk"],
        wordlist : $scope.wordlist["title"],
        base_language : $scope.base_language,
        trans_language : $scope.trans_language
      });
  	 };

     $scope.flipCard = function (card) {
      if ($scope.showCards.indexOf(card.slug) == -1 &&
        $scope.showCards.length < 2) {
        $scope.showCards.push(card.slug)
      }
       if ($scope.showCards.length == 2) {
        $scope.checkCards($scope.showCards[0], $scope.showCards[1]);
       }
     };

  	var url = "http://127.0.0.1:8000/wordlists/json/1/";
  	$http.get(url)
  	 	.success(function (data) {

          $scope.wordlist = data;

          $scope.base_language = "unknown";
          $scope.trans_language = "unknown";

          try {
            $scope.base_language = data["base_language"]["title"].toLowerCase();
            $scope.trans_language = data["trans_language"]["title"].toLowerCase();
          } catch(e) {
            // we don't care really, it either works or not
          }

          mixpanel.track("activity launched", {
            activity :  "matching",
            wordlist_id : $scope.wordlist["pk"],
            wordlist : $scope.wordlist["title"],
            base_language : $scope.base_language,
            trans_language : $scope.trans_language
          });

	  	   	$scope.gameWon = false;
	  	   	$scope.cards = $scope.createCards();
	  	   	$scope.setUpBoard();
	  	   	$scope.playGame();
          $scope.showCards = []
          $scope.hideCards = []
          $scope.correct = 0;
          $scope.wrong = 0;
	  	   	$scope.createCards();
          $scope.done = false;
          $scope.seconds = 0;
          $scope.startTimer();
          $scope.score = 0;
  	 });

  $scope.audio_url = function(path) {
        return $sce.trustAsResourceUrl("http://127.0.0.1:8000" + path);
    }

  }]);
