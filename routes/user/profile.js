const router = require('express').Router();
const multer = require('multer');
const User = require('../../model/User');
const path = require('path');
const { loginValidation } = require('../../middlewear/validation');
const { auth } = require('../../middlewear/auth');

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
	if (ext == '.png' || ext == '.jpg' || ext == '.jpeg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
// fileSize limite file size
const upload = multer({
	storage,
	limits     : {
		fileSize : 1024 * 1024 * 6
	},
	fileFilter : fileFilter
});

router.get('/', auth, async (req, res) => {
	const user = await User.findById(req.session.user.id);
	return res.render('user/profile', { user });
});
router.get('/settings', auth, async (req, res) => {
	const user = await User.findById(req.session.user.id);
	return res.render('user/settings', { user });
});

router.post('/test', upload.single('profileImage'), async (req, res) => {
	if (!req.file) return res.send('No file recived or invalid file type');
	console.log(req.file);
	await User.updateOne({ username: 'adamscode' }, { $set: { profileImage: '/uploads/' + req.file.filename } });
	console.log('Updated user profile picture.');
	res.redirect('/user/profile');
});

router.post('/update', upload.single('avatar'), async (req, res) => {
	if (!req.session.user) return res.redirect('/login');

	const { username, email, name } = req.body;

	if (!username || !email) return res.send('One or more fields was left blank.');

	const user = await User.findByIdAndUpdate(
		req.session.user.id,
		{
			$set: req.file
				? { username, email, name, profileImage: '/uploads/' + req.file.filename }
				: { username, email, name }
		},
		{ useFindAndModify: false }
	);

	console.log(user);
	res.redirect('/user/profile/settings');
});

module.exports = router;
