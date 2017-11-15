/*
 * Require this file and use the export as you would use mongoose. This makes
 * sure that the database is properly set up no matter where it's used. (The
 * code in this file only runs once no matter how many times you require it.)
 */

const mongoose = require('mongoose');

// Use native promises instead of whatever mongoose normally uses. This avoids
// some error messages.
mongoose.Promise = Promise;

// Connect to the database at localhost called 'creativityProject5'
mongoose.connect('mongodb://localhost/creativityProject5', {useMongoClient: true});

// Log errors that happen
mongoose.connection.on('error', function(err) {
	console.error("Database error:", err);
});

module.exports = mongoose;
