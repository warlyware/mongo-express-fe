app.controller('NavCtrl', function($scope, $rootScope, $state, $firebaseAuth,
  $location, $firebaseObject, ATN, User, Auth, AuthService) {
  $scope.uiState = $state;

  // var ref = new Firebase(ATN.FIREBASE_URL + '/USERS');
  // $scope.authObj = $firebaseAuth(ref);
  $scope.loginUser = function() {
    AuthService.login($scope.login.email, $scope.login.password);
  }

  $scope.logoutUser = function() {
    Auth.$unauth();
    $rootScope.authData = null;
    $location.path('/logout');
  }

  Auth.$onAuth(function(authData) {
    if (authData) {
      console.log('authData:', authData);
      $rootScope.authData = authData;
      var userRef = new Firebase(ATN.FIREBASE_URL + '/USERS/' + authData.uid);
      console.log(userRef);
      var userObj = $firebaseObject(userRef);
      // userObj.$bindTo($rootScope, 'currentUser');
      $rootScope.currentUser = userObj;
      console.log('currentUser:', $scope.currentUser);
    }
  });
});