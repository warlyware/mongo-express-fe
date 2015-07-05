app.factory('Auth', function($firebaseAuth, ATN) {
  var ref = new Firebase(ATN.FIREBASE_URL);
  return $firebaseAuth(ref);
});