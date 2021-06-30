const mongoose = require('mongoose');

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
	comments : [ { body: String, date: Date } ],
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
