app.controller('NavCtrl', function($scope, $state, $firebaseAuth,
  $location, $firebaseObject, ATN, User, Auth, AuthService) {
  $scope.uiState = $state;

  var ref = new Firebase(ATN.FIREBASE_URL + '/users');
  $scope.authObj = $firebaseAuth(ref);
  // $scope.loginUser = function() {
  //   AuthService.login($scope.login.email, $scope.login.password);
  // }

  $scope.logoutUser = function() {
    $scope.authData = {};
    console.log(AuthService.resolveUser());
    $state.go('home');
    Auth.$unauth();
  }

  Auth.$onAuth(function(authData) {
    if (authData) {
      console.log(authData);
      $scope.authData = authData;
      // var userRef = new Firebase(ATN.FIREBASE_URL + authData.uid);      
      // var userObj = $firebaseObject(userRef);
      // userObj.$bindTo($rootScope, 'currentUser');
    } else {
      $state.go('login');
    }
  });


  // $scope.authObj.$authWithPassword({
  //   email: "my@email.com",
  //   password: "mypassword"
  // }).then(function(authData) {
  //   console.log("Logged in as:", authData.uid);
  // }).catch(function(error) {
  //   console.error("Authentication failed:", error);
  // });
});