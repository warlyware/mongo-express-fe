'use strict';

angular.module('heimdall', [])

.controller('MainCtrl', function($scope, $http){
  $scope.submitQuestion = function(evt) {
    $http.post('http://localhost:3000/questions', $scope.question).success(function(data) {
      console.log(data);
    }).error(function(err) {
      console.log(err);
    });
    $location.path('/');
  }

  $http.get('http://localhost:3000/limitquestions').success(function(data) {
    $scope.questions = data;
  }).error(function(err) {
    console.log(err);
  });
});
