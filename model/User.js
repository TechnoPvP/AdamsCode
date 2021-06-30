const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name     : {
		first : String,
		last  : String
	},
	username : {
		type    : String,
		require : true,
		min     : 3,
		max     : 100
	},
	email    : {
		type    : String,
		require : true,
		max     : 255,
		min     : 6
	},
	password : {
		type     : String,
		required : true,
		max      : 1024,
		min      : 6
	},
	date     : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('users', userSchema);
