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
    $scope.answer.username = $rootScope.currentUser.username;
    $scope.answer.email = $rootScope.currentUser.email;
    Answer.addAnswer($scope.slug, $scope.answer)
    .success(function(data){
      $scope.question = data;
      $scope.answer = {};
    }).catch(function(err) {
      console.error(err);
    });
  };
});