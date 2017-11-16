const mongoose = require('../db');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
  text: String,
  posterName: String,
	questionId: {type: Schema.Types.ObjectId, ref: 'Question'},
	upvotes: {type: Number, default: 0},
});

answerSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model('Answer', answerSchema);
