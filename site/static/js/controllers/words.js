mainApp.controller('WordsController', ['$scope', '$http', '$routeParams',
  '$rootScope',

function ($scope, $http, $routeParams, $rootScope) {
    $rootScope.body_classes = "wordlist lexeme"
    if ($routeParams.id)
      { $scope.id = $routeParams.id}
    if (!$scope.id) {
      var url = "http://127.0.0.1:8000/word/json/";
      $http.get(url)
      .success(function(data) {
        $scope.wordlists = data;
        }
      );
    } else {
      var url = "http://127.0.0.1:8000/lexemes/detail/json/" + $scope.id;
      $http.get(url)
      .success(function(data) {
        $scope.word = data;
        }
      );
    }



  }

  ])