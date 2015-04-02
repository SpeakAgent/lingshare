mainApp.controller('WordReviewController', ['$scope', '$http', '$routeParams',
  '$rootScope', '$sce', 'jwtHelper',

  function ($scope, $http, $routeParams, $rootScope, $sce, jwtHelper) {

    $scope.waiting = true
    $scope.loading = false

    $scope.startGame = function () {
      $scope.preload()
    }

    $scope.preLoad = function () {
      $scope.loading=true
      console.log("in preload")
      angular.element(document).ready(function () {
        $scope.$apply(function(){
            $scope.waiting = false;
        });
        $scope.loading = false
        console.log($scope.waiting)
      });
    }

    $scope.id = $routeParams.id;
    // Get the list!
    var url = "http://127.0.0.1:8000/wordlists/json/" + $scope.id;
    $http.get(url)
      .success(function(data) {
        $scope.list = data;
        $scope.currentSampleIndex = 0;
        $scope.viewWords()
        console.log(data)
        }
      );

    // Start the list by setting wordnum to 0
    $scope.viewWords = function () {
      $scope.current = 0;
      $scope.showAllWords = true;
      $scope.display = 'grid';
    }

    $scope.playAudio = function (current) {
      var audio = document.getElementById("word-player-" + current);
      console.log(audio)
      audio.load()
      audio.play()
    }

    $scope.backToList = function () {
      $scope.showAllWords = true;
    }

    $scope.startReview = function (current) {
      if (typeof(current)!='undefined') {
        $scope.current = current
      }
      $scope.showAllWords = false
    }

    $scope.loadNext = function () {
      $scope.current++
      $scope.currentSampleIndex = 0;
    }

    $scope.loadPrev = function () {
      $scope.current--
      $scope.currentSampleIndex = 0;
    }

    $scope.getNext = function(id) {
      return parseInt(id) + 1
    }
    $scope.getPrev = function(id) {
      return parseInt(id) - 1
    }

    $scope.audio_url = function(path) {
        return $sce.trustAsResourceUrl(path);
    }

    $scope.isCurrentSampleIndex = function (index) {
        return $scope.currentSampleIndex === index;
    };


    $scope.setCurrentSampleIndex = function (index) {
        $scope.currentSampleIndex = index;
    };

    // All done!
   }
  ])