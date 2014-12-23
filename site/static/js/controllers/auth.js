mainApp.controller('LoginController', function($scope, $http, $rootScope, jwtHelper){
  // Form data for the login modal
  $scope.loginData = {};
  $scope.authToken = localStorage.getItem('authToken');
  $scope.username = jwtHelper.decodeToken($scope.authToken).username

  // Perform logout
  $scope.doLogout = function() {
    $rootScope.authToken = null;
    $scope.authToken = null;

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];

    $rootScope.userProfile = null;

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
    });
  };
})