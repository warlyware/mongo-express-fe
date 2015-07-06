app.controller('NewQuestionCtrl', function($scope, $rootScope, Question, $state){
  $scope.submitQuestion = function() {
    $scope.question.email = $rootScope.currentUser.email;
    $scope.question.username = $rootScope.currentUser.username;
    Question.addQuestion($scope.question)
      .success(function(data) {
        $scope.question = {};
        $state.go("home");
      })
      .catch(function(err) {
        console.error(err);
      })
  };
});