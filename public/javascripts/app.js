angular.module('questionApp', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope,$http){
    $scope.questions = [
    ];

    $scope.addQuestion = function() {
      return $http.post('/question', {title:$scope.questionFormContent}).success(function(data) {
        console.log(data);
        $scope.questions.push(data);
        $scope.questionFormContent='';
      });
    }

    $scope.addComment = function(question) {
      return $http.post('/question/'+question._id+"/answer", {text:question.commentFormContent}).success(function(data) {
        question.comments.push(data);
        question.commentFormContent='';
      });
    };

    $scope.incrementUpvotes = function(comment) {
      return $http.put('/answer/'+comment._id+'/upvote/').success(function(data){
        angular.copy(data, comment);
      });
      comment.upvotes += 1;
    };

    $scope.getAll = function() {
      return $http.get('/questions').success(function(data){
        angular.copy(data, $scope.questions);
      });
    };

    $scope.getComments = function(question) {
      return $http.get('/question/'+question._id+'/answers').success(function(data) {
        question.comments = data;
      });
    }

    $scope.getAll();
  }
]);
