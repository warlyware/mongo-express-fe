app.controller('NewQuestionCtrl', function($scope, Question, $state){
  $scope.submitQuestion = function() {
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