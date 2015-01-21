mainApp.controller('WordListsController', ['$scope', '$http', '$routeParams',
  '$rootScope', '$sce', 'jwtHelper',

  function ($scope, $http, $routeParams, $rootScope, $sce, jwtHelper) {
    
    $rootScope.body_classes = "wordslist";

    $scope.updateActivity = function (status) {
      user = localStorage.getItem('username');
      token = localStorage.getItem('authToken');
      req = {
        url: 'http://127.0.0.1:8000/user/username/' + user + '/',
        method: "PUT",
        data: {activities :  [{title: "Word Review", 
          status: status,
          wordlist_pk: $scope.list.pk}] },
        headers: {
                    'Authorization': 'JWT ' + token,
        }
      }

      $http(req)
      .success(function (data) {
      });}


    if ($routeParams.id)
      { $scope.id = $routeParams.id;
        $scope.display = 'grid';
      }
    if ($routeParams.wordID)
    {
        $scope.wordID = $routeParams.wordID;

    }

    $scope.viewWords = function() {
      if ($routeParams.wordID) 
      {
          $scope.wordID = $routeParams.wordID;
          if (parseInt($scope.wordID) == 0) {
            $scope.updateActivity("started");
            $scope.score = 0;
          }
          if (parseInt($scope.wordID) == $scope.list.words.length - 1) {
            $scope.updateActivity("completed");
            $scope.score = 100;
            req = {
              method: 'POST',
              url: 'http://127.0.0.1:8000/activity/single/get/',
              data: {
                username: localStorage.getItem('username'),
                activity: 'Word Review',
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
                  console.log(data);
                });
              })
              .error(function (data) {
                console.log(data)
              })
          }
      }
    }
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
        $scope.viewWords()
        }
      );
    }
    

    $scope.audio_url = function(path) {
        return $sce.trustAsResourceUrl("http://127.0.0.1:8000" + path);
    }
    $scope.getNext = function(id) {
      return parseInt(id) + 1
    }
    $scope.getPrev = function(id) {
      return parseInt(id) - 1
    }


  }

  ])