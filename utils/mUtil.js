const { Mongoo, ObjectID } = require('mongodb');
const mongoose = require('mongoose');

// Connect to DB

const db = function() {};

db.connect = function(callback) {
	mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if (err) {
			console.error('MongoDB Failed To Start', err);
			return callback(err);
		}

		console.log('Connection to MongoDB initialized successfully');
	});
};

db.checkUser = function(uname, callback) {
	const collection = client.db('users').collection('user');

	collection.findOne({ username: uname }).then((result) => callback(result)).catch((err) => callback(err));
};

db.checkManyUsers = function(username, callback) {
	const db = client.db('users').collection('user');

	const result = db.find({ username: username });
	if (!result) callback(null, 'No result found');

	callback(result);
};

db.addUser = function(userdata, callback) {
	const { username, passwordHash, email } = userdata;
	if (!username || !passwordHash || !email) {
		callback(undefined, 'Userdata incorrect please try again');
	} else {
		const db = client.db('users').collection('user');

		db
			.updateOne(
				{ username: username },
				{ $set: { username: username, passwordHash: passwordHash, email: email } }
			)
			.then((result) => console.info(result))
			.catch((e) => console.log(e));
	}
};

module.exports.db = db;
