const mongoose = require('mongoose');

const currentDate = () => {
	const date = new Date();

	return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
};

const postSchema = new mongoose.Schema({
	heading  : {
		type     : String,
		required : true,
		min      : 4
	},

	date     : Date,
	author   : {
		type     : String,
		min      : 3,
		required : true
	},
	content  : {
		type     : String,
		required : true
	},
	comments : [
		{
			username: String,
			body: String,
			likes: [ { username: String } ],
			date: { type: String, default: currentDate }
		}
	],
	slug     : {
		type   : String,
		unique : true,
		index  : true
	}
});

postSchema.statics.findBySlug = function(slug) {
	return this.findOne({ slug: slug });
};

module.exports = mongoose.model('post', postSchema);
