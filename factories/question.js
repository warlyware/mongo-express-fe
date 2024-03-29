app.factory('Question', function($http, ATN, $state) {
  return {
    getOne: function(slug) {
      return $http.get(ATN.API_URL + "/questions/" + slug);
    },
    getAll: function() {
      return $http.get(ATN.API_URL + "/questions");
    },
    addQuestion: function(newQuestion) {
      return $http.post(ATN.API_URL + "/questions", newQuestion);
    },
    deleteQuestion: function(slug) {
      return $http.delete(ATN.API_URL + '/questions/' + slug).success(function() {
        $state.go('home');
      })
    },
    editQuestion: function(slug, updatedQuestion) {
      return $http.patch(ATN.API_URL + '/questions/' + slug, updatedQuestion);
    }
  }
});