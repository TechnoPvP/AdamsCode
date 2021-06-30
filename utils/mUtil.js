const mongoose = require('mongoose');
// Connect to DB

const db = function() {};

db.connect = function(callback) {
	mongoose.connect(
		process.env.DB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
		(err) => {
			if (err) {
				console.error('MongoDB Failed To Start', err);
				return callback(err);
			}

			console.log('Connection to MongoDB initialized successfully');
		}
	);
};

module.exports.db = db;
