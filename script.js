'use strict';

angular.module('questionApp', ['ui.router'])
.constant('ATN', {
  'API_URL': 'http://localhost:3000'
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'list.html',
      controller: 'MainCtrl'
    });
  $stateProvider
    .state('away', {
      url: '/away/:id',
      templateUrl: 'away.html',
      controller: function($scope, $state) {
        $scope.away = $state.params.id;
      }
    });
  $stateProvider
    .state('newQuestion', {
      url: '/new',
      templateUrl: 'new.html',
      controller: 'NewQuestionCtrl'
    });
  $stateProvider
    .state('question', {
      url: '/:slug',
      templateUrl: 'question.html',
      controller: 'QuestionCtrl'
    });
  $urlRouterProvider.otherwise('/');
})

.filter('timeInWords', function() {
  return function(input) {
    return moment(input).utc().fromNow();
  };
})

.factory('Question', function($http, ATN) {
  return {
    getAll: function() {
      return $http.get(ATN.API_URL + '/questions');
    },
    // getTwenty: function() {
    //   return $http.get(ATN.API_URL + '/limitquestions');
    // },
    addQuestion: function(newQuestion) {
      return $http.post(ATN.API_URL + '/questions', newQuestion);
    }
  };
})

.controller('QuestionCtrl', function($scope, $state, Question) {
  $scope.slug = $state.params.slug;
})

.controller('NewQuestionCtrl', function($scope, $state, Question) {
  // $scope.slug = $state.params.slug;
})


.controller('MainCtrl', function($scope, $http, $location, Question, ATN){
  
  $scope.questionSelected = false;

  $scope.showDetails = function(question) {
    console.log('details here', question.slug);
    $http.get(ATN.API_URL + '/questions/' + question.slug).success(function(data) {
      console.log(data);
      $location.url('/questions/' + question.slug);
      $scope.selectedQuestion = data;
      $scope.questionSelected = true;
    });
  };

  Question.getAll().success(function(data) {
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
  };
});