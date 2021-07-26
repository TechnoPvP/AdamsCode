const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination : function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename    : function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	const ext = path.extname(file.originalname);
	if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.pdf') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
// fileSize limite file size
const upload = multer({
	storage,
	limits     : {
		fileSize : 1024 * 1024 * 25
	},
	fileFilter : fileFilter
});

module.exports = { upload };
