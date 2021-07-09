const mongoose = require('mongoose');
const Post = require('./Post');

const userSchema = new mongoose.Schema({
	name         : {
		type : String,
		min  : 4,
		max  : 25,
		trim : true
	},
	username     : {
		type    : String,
		require : true,
		min     : 3,
		max     : 100,
		trim    : true
	},
	email        : {
		type    : String,
		require : true,
		max     : 255,
		min     : 6,
		trim    : true
	},
	password     : {
		type     : String,
		required : true,
		max      : 1024,
		min      : 6
	},
	date         : {
		type    : Date,
		default : Date.now
	},
	profileImage : String
});

userSchema.statics.updateProfilePicture = async function(id) {
	const update = await this.updateOne({ _id: id }, { $set: { profileImage: req.file.path } });
	Post.updateOne(
		{ _id: id },
		// TODO I don't think comments should also store profileImage.
		{ $push: { comments: { userId: user.id, username: user.username, body: body } } }
	);
};

module.exports = mongoose.model('users', userSchema);
