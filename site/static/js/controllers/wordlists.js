mainApp.controller('WordListsController', ['$scope', '$http', '$routeParams',
  '$rootScope', '$sce',

  function ($scope, $http, $routeParams, $rootScope, $sce) {
    $rootScope.body_classes = "wordslist"
    if ($routeParams.id) 
      { $scope.id = $routeParams.id;
        $scope.display = 'grid';
      }
    if (!$scope.id) {
      var url = "http://127.0.0.1:8000/wordlists/json/";
      $http.get(url)
      .success(function(data) {
        $scope.wordlists = data;
        }
      );
    } else {
      var url = "http://127.0.0.1:8000/wordlists/json/" + $scope.id;
      $http.get(url)
      .success(function(data) {
        $scope.list = data;
        }
      );
    }
    $scope.audio_url = function(path) {
        return $sce.trustAsResourceUrl("http://127.0.0.1:8000" + path);
    }
  }

  ])