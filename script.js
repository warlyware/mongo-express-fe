'use strict';

angular.module('questionApp', ['ui.router', 'firebase'])
.constant("ATN", {
  "API_URL": "http://localhost:3000",
  "FIREBASE_URL": "https://questions-app.firebaseio.com"
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

.factory('Answer', function($http, ATN) {
  return {
    addAnswer: function(slug, newAnswer) {

      return $http.post(ATN.API_URL + '/questions/' + slug + '/answers', newAnswer);
      // return this.answers.push(answer);
    }
    // getAll: function(slug) {
    //   return $http.post(ATN.API_URL + '/questions/' + slug + '/answers');
    //   // return this.answers.push(answer);
    // }
  }
})

.factory('Auth', function($firebaseAuth) {
  var ref = new Firebase('https://twatter-sandwich.firebaseio.com/');
  return $firebaseAuth(ref);
})

.factory('User', function(ATN) {
  return {
    addUser: function() {
      
    },
    loginUser: function() {
      
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
.controller('NavCtrl', function($scope, $state, $firebaseAuth, ATN, User, Auth) {
  $scope.uiState = $state;

  var ref = new Firebase(ATN.FIREBASE_URL + '/users');
  $scope.authObj = $firebaseAuth(ref);
  // $scope.loginUser = function() {    
  //   AuthService.login($scope.login.email, $scope.login.password);
  // }

  $scope.authObj.$authWithPassword({
    email: "my@email.com",
    password: "mypassword"
  }).then(function(authData) {
    console.log("Logged in as:", authData.uid);
  }).catch(function(error) {
    console.error("Authentication failed:", error);
  });
})

.controller('QuestionCtrl', function($scope, Question, $state, Answer){
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