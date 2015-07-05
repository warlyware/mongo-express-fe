app.service('AuthService', function(Auth, $state, $firebaseObject) {

  this.login = function(email, password) {
    console.log(email, password);
    Auth.$authWithPassword({
      email: email,
      password: password
    })
    .then(function(authData) {
      if (authData) {
        $state.go('home');
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  this.logout = function() {
    Auth.$unauth();
  }

  this.resolveUser = function() {
    return Auth.$getAuth();
  }

  this.register = function(username, email, password) {
    Auth.$createUser({
      email: email,
      password: password
    })
    .then(function(userData) {
      console.log("User " + userData.uid + " created successfully!");
      bootbox.alert("Thank you for registering " + username);
      var userRef = new Firebase(ATN.FIREBASE_URL + '/USERS/' + userData.uid);      
      var userObj = $firebaseObject(userRef);
      userRef.set({
        username: username,
        img: '/img/user.png',
        name: userData.uid,
        email: email
      });
      return Auth.$authWithPassword({
        email: email,
        password: password
      });
    })
    .then(function(authData) {
      console.log("Logged in as:", authData);
      $location.path('/main');
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
  }

});