app.controller('QuestionCtrl', function($scope, Question, $state, Answer){
  $scope.slug = $state.params.slug;

  Question.getOne($state.params.slug)
    .success(function(data) {
      $scope.question = data;
    }).catch(function(err) {
      console.error(err);
      $state.go("404");
    });

  $scope.addAnswer = function() {
    Answer.addAnswer($scope.slug, $scope.answer)
    .success(function(data){
      $scope.question = data;
      $scope.answer = {};
    }).catch(function(err) {
      console.error(err);
    });
  };
})
.controller('MainCtrl', function($scope, Question){
  Question.getAll().success(function(data) {
    $scope.questions = data;
  }).catch(function(err) {
    console.error(err);
  });
});