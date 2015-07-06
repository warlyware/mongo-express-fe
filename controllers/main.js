app.controller('MainCtrl', function($scope, $state, Question){
  Question.getAll().success(function(data) {
    $scope.questions = data;
  }).catch(function(err) {
    console.error(err);
  });


  $scope.editingQuestion = false;

  $scope.showEditForm = function(question) {
    $scope.editingQuestion = !$scope.editingQuestion;
    $scope.updatedQuestion = question.body;
  }

  $scope.deleteQuestion = function(question) {
    if (question.answers.length < 1) {
      Question.deleteQuestion(question.slug).success(function() {
        $state.go('home');
      });
    }
  }

  $scope.editQuestion = function(question, updatedQuestion) {
    if (question.answers.length < 1) {
      Question.editQuestion(question.slug, { body: updatedQuestion});
    }
  }  

});