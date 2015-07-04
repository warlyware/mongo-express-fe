'use strict';

angular.module('questionApp', ['ui.router', 'firebase'])
.constant("ATN", {
  "API_URL": "http://localhost:3000",
  "FIREBASE_URL": "https://questions-app.firebaseio.com/"
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "list.html",
      controller: 'MainCtrl'
    })
    .state('404', {
      url: "/404",
      templateUrl: "404.html"
    })
    .state('new', {
      url: "/new",
      templateUrl: "new.html",
      controller: "NewQuestionCtrl"
    })
    .state('question', {
      url: "/:slug",
      templateUrl: "question.html",
      controller: "QuestionCtrl"
    });
})
.factory('Question', function($http, ATN) {
  return {
    getOne: function(slug) {
      return $http.get(ATN.API_URL + "/questions/" + slug);
    },
    getAll: function() {
      return $http.get(ATN.API_URL + "/questions");
    },
    addQuestion: function(newQuestion) {
      return $http.post(ATN.API_URL + "/questions", newQuestion);
    }
  }
})

.factory('Answer', function() {
  var answers = {};
  return {
    addAnswer: function(slug, newAnswer) {

      answers[slug].push(newAnswer);
      // return this.answers.push(answer);
    },
    getAll: function(slug) {
      answers[slug] = answers[slug] || [];
      return answers[slug];
    }
  }
})

.filter("timeInWords", function() {
  return function(input) {
    return moment(input).utc().fromNow();
  }
})
.controller('NewQuestionCtrl', function($scope, Question, $state){
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
})

// .service('FBService', function($scope) {
//   this.fbRef = 
// })

.controller('NavCtrl', function($scope, $state, $firebaseAuth, ATN) {
  $scope.uiState = $state;

  // var ref = new Firebase(ATN.FIREBASE_URL);

  // // create an instance of the authentication service
  // var auth = $firebaseAuth(ref);

  // $scope.authObj.$authWithPassword({
  //   email: "my@email.com",
  //   password: "mypassword"
  // }).then(function(authData) {
  //   console.log("Logged in as:", authData.uid);
  // }).catch(function(error) {
  //   console.error("Authentication failed:", error);
  // });

})

.controller('QuestionCtrl', function($scope, Question, $state, Answer){
  $scope.slug = $state.params.slug;

  $scope.answers = Answer.getAll($scope.slug);

  Question.getOne($state.params.slug)
    .success(function(data) {
      $scope.question = data;
    }).catch(function(err) {
      console.error(err);
      $state.go("404");
    });

  $scope.addAnswer = function() {
    Answer.addAnswer($scope.slug, $scope.answer);
    $scope.answer = {};
  }
})
.controller('MainCtrl', function($scope, Question){
  Question.getAll().success(function(data) {
    $scope.questions = data;
  }).catch(function(err) {
    console.error(err);
  });
});