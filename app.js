'use strict';

var app = angular.module('questionApp', ['ui.router', 'firebase'])
.constant("ATN", {
  "API_URL": "http://localhost:3000",
  "FIREBASE_URL": "https://questions-app.firebaseio.com"
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/views/list.html",
      controller: 'MainCtrl'
    })
    .state('404', {
      url: "/404",
      templateUrl: "/views/404.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "/views/login.html",
      controller: "AuthCtrl"      
    })
    .state('register', {
      url: "/register",
      templateUrl: "/views/register.html",
      controller: "AuthCtrl"
    })    
    .state('new', {
      url: "/new",
      templateUrl: "/views/new.html",
      controller: "NewQuestionCtrl"
    })
    .state('logout', {
      url: "/logout",
      templateUrl: "/views/logout.html"
    })
    .state('question', {
      url: "/:slug",
      templateUrl: "/views/question.html",
      controller: "QuestionCtrl"
    });
})
.filter("timeInWords", function() {
  return function(input) {
    return moment(input).utc().fromNow();
  }
})