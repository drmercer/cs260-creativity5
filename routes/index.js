var express = require('express');
var router = express.Router();

var Question = require('../database/models/Question');
var Answer = require('../database/models/Answer');


router.get('/questions', function(req, res, next) {
  Question.find(function(err, questions) {
    if (err) return next(err);
    questions.forEach(q => q.comments = []);
    res.json(questions);
  });
});

router.post('/question', function(req, res, next) {
  var question = new Question(req.body);
  question.save(function(err) {
    if (err) return next(err);
    res.json(question);
  });
});

router.put('/question/:question/upvote', function(req, res, next) {
  req.question.upvote(function(err) {
    if (err) return next(err);
    res.json(req.question);
  });
})

router.get('/question/:questionId/answers', function(req, res, next) {
  Answer.find({questionId: req.params.questionId}, function(err, answers) {
    if (err) return next(err);
    res.json(answers);
  });
});

router.post('/question/:questionId/answer', function(req, res, next) {
  var ans = new Answer(req.body);
  ans.questionId = req.params.questionId;
  ans.save(function(err) {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

router.put('/answer/:answer/upvote', function(req, res, next) {
  req.answer.upvote(function(err) {
    if (err) return next(err);
    res.json(req.answer);
  });
})

// Helpers

router.param('question', function(req, res, next, questionId) {
  var query = Question.findById(questionId);
  query.exec(function(err, q) {
    if (err) return next(err);
    if (!q) return next(new Error("Can't find question with ID " + questionId));
    req.question = q;
    next();
  });
});

router.param('answer', function(req, res, next, answerId) {
  var query = Answer.findById(answerId);
  query.exec(function(err, obj) {
    if (err) return next(err);
    if (!obj) return next(new Error("Can't find answer with ID " + answerId));
    req.answer = obj;
    next();
  });
});

module.exports = router;
