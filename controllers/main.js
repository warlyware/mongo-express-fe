app.controller('MainCtrl', function($scope, Question){
  Question.getAll().success(function(data) {
    $scope.questions = data;
  }).catch(function(err) {
    console.error(err);
  });

  $scope.deleteQuestion = function(question) {
    // if (question.answers.length < 1) {
      Question.deleteQuestion(question.slug);
      Question.getAll().success(function(data) {
        $scope.questions = data;
      }).catch(function(err) {
        console.error(err);
      });
  }
});