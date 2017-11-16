var express = require('express');
var router = express.Router();

var Question = require('../database/models/Question');
var Answer = require('../database/models/Answer');


router.get('/questions', function(req, res, next) {
  Question.find(function(err, questions) {
    if (err) return next(err);
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

// Helper
router.param('question', function(req, res, next, questionId) {
  var query = Question.findById(questionId);
  query.exec(function(err, q) {
    if (err) return next(err);
    if (!q) return next(new Error("Can't find question with ID " + questionId));
    req.question = q;
    next();
  });
});

module.exports = router;
