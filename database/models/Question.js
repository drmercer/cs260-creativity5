const mongoose = require('../db');

var questionSchema = new mongoose.Schema({
  title: String,
  posterName: {type: String, default:'Billy Joe'},
	upvotes: {type: Number, default: 0},
});

questionSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model('Question', questionSchema);
