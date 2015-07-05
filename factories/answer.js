app.factory('Answer', function($http, ATN) {
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
});