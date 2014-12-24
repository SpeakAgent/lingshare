mainApp.controller('LoginController', function($scope, $http, $rootScope, jwtHelper, User){
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
        
        if($rootScope.AnalyticsAvailable && $rootScope.networkAvailable) {
          analytics.trackEvent('System', 'LoginSuccess', $scope.loginData.username);
          analytics.setUserId($scope.loginData.username);
          analytics.addCustomDimension('dimension1', $scope.loginData.username);
        }
        var timestamp = Date.now()/1000;
        var eventData = {
          'category': 'System',
          'action': 'LoginSuccess',
          'label': $scope.loginData.username,
          'timestamp': timestamp,
          'username': $rootScope.username
        };
        localStorage.setItem('analytics-'+timestamp, JSON.stringify(eventData));
        $rootScope.authToken = data.token;
        $rootScope.username = $scope.loginData.username;
        localStorage.setItem('authToken', $rootScope.authToken);
        localStorage.setItem('username', $rootScope.username);
        $http.defaults.headers.common.Authorization = 'Token ' + $rootScope.authToken;
        $scope.username = localStorage.getItem('username');
        $scope.authToken = localStorage.getItem('authToken');
        $scope.User = User;
        $scope.User.username = $scope.username;
    });
  };
})

mainApp.factory('User', function () {

  return {
    username: ''
    }
  });