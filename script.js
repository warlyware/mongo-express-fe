'use strict';

angular.module('questionApp', [])
.constant('ATN', {
  'API_URL': 'http://localhost:3000'
})

.factory('Question', function($http, ATN) {
  return {
    getAll: function() {
      return $http.get(ATN.API_URL + '/questions');
    },
    getTwenty: function() {
      return $http.get(ATN.API_URL + '/limitquestions');
    },
    addQuestion: function(newQuestion) {
      return $http.post(ATN.API_URL + '/questions', newQuestion)
    }
  }
})

.controller('MainCtrl', function($scope, $http, $location, Question, ATN){
  
  $scope.showDetails = function(question) {
    console.log('details here', question);
    $http.get(ATN.API_URL + '/questions/' + question.body).success(function(data) {
      console.log(JSON.stringify(data));
    });
  }

  Question.getTwenty().success(function(data) {
    console.log(data);
    $scope.questions = data;
  });

  $scope.submitQuestion = function() {
    Question.addQuestion($scope.question)
      .success(function(data) {
        $scope.questions.unshift(data);
        $scope.question = {};
        $('#new-question-modal').modal('hide');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});