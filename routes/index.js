var express = require('express');
var router = express.Router();

var mongoose = require('../database/db');
var Answer = require('../database/models/Answer');

var db = mongoose.connection;

module.exports = router;
