mainApp.controller('FlashCardController', ['$scope', '$timeout', '$http',
  '$interval', '$rootScope',

  function ($scope, $timeout, $http, $interval, $rootScope) {

  $scope.used_words = []

  $scope.seconds = 0

  $rootScope.body_classes = "games flashcards"


  $scope.stopTimer = function () {
    if ($scope.done) {
      $interval.cancel($scope.stop);
      $scope.stop = undefined;
    }
  };

  var url = "http://127.0.0.1:8000/wordlists/json/1/"
  $http.get(url)
    .success(function(data) {
      $scope.wordlist = data;
      $scope.getUnusedWords()
      $scope.newScreen()
      $scope.actions = {
        wrong: [],
        right: []
      }
      $scope.done = false;
      $scope.seconds = 0;
      $scope.stop = $interval(function () {
      if (!$scope.done) {
       $scope.seconds++;
      } else {
        $scope.stopTimer();
      }
    }, 1000);
    });

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
  }

  $scope.newScreen = function() {
    // Get new word and index of new word
    if ($scope.unused_words.length > 0) {
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
      $scope.possible_cards = $scope.shuffle($scope.possible_cards)
    } else {
      $scope.endScreen()
    }
  };

  $scope.endScreen = function() {
    $scope.done = true;
  }


  $scope.checkCard = function(item) {
    // Flip it
    if ($scope.show_symbol == null) {
      // Only do something if we don't have a card flipped
      $scope.show_symbol = item.base_word.root_word;
      // Win or no?
      if (item.base_word.root_word == $scope.card.base_word.root_word) {
        $scope.alerts[item.base_word.root_word] = "That's right!";
        $timeout(function() {
          $scope.alerts[item.base_word.root_word] = null;
          $scope.show_symbol = null;
          $scope.actions.right.push({
            word: $scope.card.base_word.root_word,
            clicked: item.base_word.root_word
          });
          $scope.newScreen();
        }, 1500);
      } else {
        $scope.alerts[item.base_word.root_word] = "Nope";
        $timeout(function() {
          $scope.alerts[item.base_word.root_word] = null;
          $scope.show_symbol = null;
          $scope.actions.wrong.push({
            word: $scope.card.base_word.root_word,
            clicked: item.base_word.root_word
          })
        }, 1500)
      };
    }
  };
}])