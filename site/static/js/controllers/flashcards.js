mainApp.controller('FlashCardController', ['$scope', '$timeout', '$http',
  '$interval', '$rootScope', '$animate', '$sce', '$routeParams', '$route',
  'appConfig',

  function ($scope, $timeout, $http, $interval, $rootScope, $animate, 
    $sce, $routeParams, $route, appConfig) {

    $scope.basePath = appConfig.basePath
    
  $scope.used_words = []

  $scope.seconds = 0
  $scope.current_round = 0

  $rootScope.body_classes = "games flashcards"

  $scope.waiting = true

  $scope.sendScore = function () {
      // Need to get our current activity before getting
      // the score. Unique to activity and user
      req = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/activity/single/get/',
        data: {
          username: localStorage.getItem('username'),
          activity: 'Flashcards',
        },
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('authToken'),
        }
      };

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
          };

          $http(req).success(function (data) {

          })
          .error(function (data) {

          });
        })
        .error(function (data) {

        });
       };


  $scope.stopTimer = function () {
    if ($scope.done) {
      $interval.cancel($scope.stop);
      mixpanel.track("timer end", {
        activity: "flashcard",
        seconds: $scope.seconds,
      });
      $scope.stop = undefined;
    }
  };

  if ($routeParams.id)
      { $scope.id = $routeParams.id}
    else
    {
      $scope.id = 1
    }
    var url = "http://127.0.0.1:8000/wordlists/json/" + $scope.id + "/";

  $http.get(url)
    .success(function(data) {
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
        activity :  "flashcard",
        wordlist_id : $scope.wordlist["pk"],
        wordlist : $scope.wordlist["title"],
        base_language : $scope.base_language,
        trans_language : $scope.trans_language
      });

      $scope.getUnusedWords();
      $scope.newScreen();
      $scope.actions = {
        wrong: [],
        right: []
      };
      $scope.done = false;
      $scope.seconds = 0;
      $scope.stop = $interval(function () {
      if (!$scope.done) {
       $scope.seconds++;
      } else {
        $scope.stopTimer();
      }

      $scope.preLoad();
    }, 1000);
      $scope.score = 0;
    });

  $scope.preLoad = function () {
    angular.element(document).ready(function () {
        $scope.waiting = false
    });
    
    
  }

  $scope.alerts = [];

  $scope.show_symbol = null;

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

  $scope.getUnusedWords = function() {
    $scope.unused_words = [];
    angular.forEach($scope.wordlist.words, function(word, index) {
      $scope.unused_words.push(word);
    });
    $scope.unused_words = $scope.shuffle($scope.unused_words);
    $scope.words = $scope.wordlist.words;
    //* Setting total number of rounds */
    $scope.rounds = $scope.words.length;
  }

  $scope.newScreen = function() {
    // Get new word and index of new word
    if ($scope.unused_words.length > 0) {
      $scope.current_round++;
      $scope.card = $scope.unused_words.pop()
      var indexes = []
      do {
        n = Math.floor(Math.random() * $scope.words.length);
        if (indexes.indexOf(n) < 0 && $scope.words[n].base_word.root_word != $scope.card.base_word.root_word) {
          indexes.push(n)
        }
      } while (indexes.length <= 2)
      // $scope.card = $scope.words[indexes[0]];
      $scope.other_cards = {
        card1: $scope.words[indexes[1]],
        card2: $scope.words[indexes[2]]
      }
      $scope.possible_cards = [$scope.other_cards.card1, $scope.other_cards.card2,
        $scope.card
      ];
      $scope.possible_cards = $scope.shuffle($scope.possible_cards);

    } else {
      $scope.endScreen();
    }
  };

  $scope.endScreen = function() {
    $scope.done = true;
    $scope.sendScore();
    $scope.activityCompleted();
  };

  $scope.activityCompleted = function () {
    mixpanel.track("activity complete", {
      activity: "flashcard",
      elapsed: $scope.seconds,
      score : $scope.score,
      wordlist_id : $scope.wordlist["pk"],
      wordlist : $scope.wordlist["title"],
      base_language : $scope.base_language,
      trans_language : $scope.trans_language
    });
  };

  $scope.selectedCard = 0;
  $scope.isCorrect = "neutral";
  $scope.tries = 0;

  $scope.checkCard = function(item) {
    $scope.tries = $scope.tries + 1;
    // Flip it
    if ($scope.show_symbol == null) {
      // Only do something if we don't have a card flipped
      $scope.show_symbol = item.base_word.root_word;
      $scope.selectedCard = item;
      // Win or no?
      if (item.base_word.root_word == $scope.card.base_word.root_word) {
        $scope.alerts[item.base_word.root_word] = "+5";
        $scope.score += 5;
        $scope.isCorrect = 'true';
        $scope.play = item.base_word.root_word;

        mixpanel.track("lexeme event", {
          activity :  "flashcard",
          match : true,
          lexeme_id: $scope.card.base_word.pk,
          lexeme_root : $scope.card.base_word.root_word,
          lexeme_trans_root: $scope.card.trans_word.root_word,
          lexeme_pair_root: item.base_word.root_word,
          seconds : $scope.seconds,
          tries: $scope.tries,
        });
        $scope.tries = 0;
        $timeout(function() {
          $scope.isCorrect = '';
          $scope.alerts[item.base_word.root_word] = null;
          $scope.show_symbol = null;
          $scope.actions.right.push({
            word: $scope.card.base_word.root_word,
            clicked: item.base_word.root_word
          });
          $scope.newScreen();
        }, 4000);
      } else {
        $scope.alerts[item.base_word.root_word] = "Try Again!";
        $scope.isCorrect = 'false';
        mixpanel.track("lexeme event", {
          activity :  "flashcard",
          match : false,
          lexeme_id: $scope.card.base_word.pk,
          lexeme_root : $scope.card.base_word.root_word,
          lexeme_trans_root: $scope.card.trans_word.root_word,
          lexeme_pair_root: item.base_word.root_word,
          seconds : $scope.seconds,
          tries: $scope.tries
        });

        $timeout(function() {
          $scope.isCorrect = '';
          $scope.alerts[item.base_word.root_word] = null;
          $scope.show_symbol = null;
          $scope.actions.wrong.push({
            word: $scope.card.base_word.root_word,
            clicked: item.base_word.root_word
          })
        }, 1000)
      };
    }
  };

  $scope.audio_url = function(path) {
        return $sce.trustAsResourceUrl(path);
    }
  $scope.reloadRoute = function() {
     $route.reload();
  }



}])
