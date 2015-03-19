mainApp.controller('LoginController', function($scope, $http,
  $rootScope, jwtHelper, User, $location){
  // Form data for the login modal
  $scope.loginData = {};
  $scope.authToken = localStorage.getItem('authToken');
  if ($scope.authToken) {
    $scope.username = jwtHelper.decodeToken($scope.authToken).username;
  }

  // Perform logout
  $scope.doLogout = function(data, status, headers, config) {
    $rootScope.authToken = null;
    $scope.authToken = null;
    $scope.username= null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');

    $scope.User = User;
    $scope.User.username = null;

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.loginData.username = $scope.loginData.username.toLowerCase();
    $scope.loginError = '';

    // Handle login
    var tokenAuthURL = 'http://127.0.0.1:8000/api-token-auth/';
    var responsePromise = $http.post(tokenAuthURL,
      {
        'username': $scope.loginData.username,
        'password': $scope.loginData.password
      });

    responsePromise.success(function(data, status, headers, config) {

        mixpanel.identify($scope.loginData.username);

        $rootScope.authToken = data.token;
        $rootScope.username = $scope.loginData.username;
        localStorage.setItem('authToken', $rootScope.authToken);
        localStorage.setItem('username', $rootScope.username);
        // localStorage.setItem('score'), $rootScope.score;
        $http.defaults.headers.common.Authorization = 'Token ' + $rootScope.authToken;
        $scope.username = localStorage.getItem('username');
        $scope.authToken = localStorage.getItem('authToken');
        $scope.User = User;
        $scope.User.username = $scope.username;
        $rootScope.username = $scope.username;

        $location.path('/dashboard');
    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.loginError = "Unable to log in with the provided username and password.";
    });

  };
})

mainApp.factory('User', function () {

  return {
    username: ''
    }
  });
