app.controller('NavCtrl', function($scope, $state, $firebaseAuth, ATN, User, Auth) {
  $scope.uiState = $state;

  var ref = new Firebase(ATN.FIREBASE_URL + '/users');
  $scope.authObj = $firebaseAuth(ref);
  // $scope.loginUser = function() {    
  //   AuthService.login($scope.login.email, $scope.login.password);
  // }

  $scope.authObj.$authWithPassword({
    email: "my@email.com",
    password: "mypassword"
  }).then(function(authData) {
    console.log("Logged in as:", authData.uid);
  }).catch(function(error) {
    console.error("Authentication failed:", error);
  });
});