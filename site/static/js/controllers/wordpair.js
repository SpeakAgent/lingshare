mainApp.controller('WordPairController', ['$scope', '$http', '$routeParams',
  '$rootScope', '$sce',

  function ($scope, $http, $routeParams, $rootScope, $sce) {
    $rootScope.body_classes = "wordslist"
    if ($routeParams.id) 
      { $scope.id = $routeParams.id;
        $scope.display = 'grid';
      }
      var url = "http://127.0.0.1:8000/wordpairs/detail/" + $scope.id;
      $http.get(url)
      .success(function(data) {
        $scope.word = data;
        }
      );
    $scope.audio_url = function(path) {
        return $sce.trustAsResourceUrl("http://127.0.0.1:8000" + path);
    }
  }

  ])