angular.module('questionApp', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope,$http){
    $scope.questions = [
      {title:"Question1",comments:[{text:"this question is the best", upvotes:0}, {text:"the answer is yes", upvotes:0}]},
      {title:"Question2",comments:[{text:"the answer is no",upvotes:0}, {text:"boo",upvotes:0}, {text:"go BYU!!!! 8)",upvotes:0}]}
    ];

    $scope.addQuestion = function() {
      $scope.questions.push({title:$scope.questionFormContent,comments:[]})
      $scope.questionFormContent='';
    }

    $scope.addComment = function(question) {
      question.comments.push({text:question.commentFormContent,upvotes:0});
      question.commentFormContent='';
    };

    $scope.incrementUpvotes = function(comment) {
      comment.upvotes += 1;
    };

/*    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };*/

    //$scope.getAll();
  }
]);
