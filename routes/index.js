var express = require('express');
var router = express.Router();

var mongoose = require('../database/db');

var db = mongoose.connection;
db.then(function() {
  console.log("Connected successfully!");
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
