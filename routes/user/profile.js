const router = require('express').Router();
const User = require('../../model/User');
const Post = require('../../model/Post');
const { loginValidation } = require('../../middlewear/validation');
const { auth } = require('../../middlewear/auth');
const uploadUtils = require('../../utils/UploadUtils.js');

router.get('/', auth, async (req, res) => {
	const user = await User.findById(req.session.user.id);
	const posts = await Post.find({ author: user.username }, 'heading comments').lean();
	const post = await Post.find({}, 'comments');
	// const commentAmount = comments.comments.filter((e) => e.userId == req.session.user.id);
	let test = post.forEach((e) => {
		const fil = e.comments.filter((elem) => (elem.uderId = '60da45e0e25d735030396713'));
		return fil;
	});
	console.log(test);
	const stats = {
		published : posts.length,
		comments  : 1,
		tags      : 0
	};
	return res.render('user/profile', { user, stats });
});
router.get('/settings', auth, async (req, res) => {
	const user = await User.findById(req.session.user.id);
	return res.render('user/settings', { user });
});

router.post('/test', uploadUtils.upload.single('profileImage'), async (req, res) => {
	if (!req.file) return res.send('No file recived or invalid file type');
	console.log(req.file);
	await User.updateOne({ username: 'adamscode' }, { $set: { profileImage: '/uploads/' + req.file.filename } });
	console.log('Updated user profile picture.');
	res.redirect('/user/profile');
});

router.post('/update', uploadUtils.upload.single('avatar'), async (req, res) => {
	if (!req.session.user) return res.redirect('/login');

	const { username, email, name } = req.body;

	if (!username || !email) return res.send('One or more fields was left blank.');

	const user = await User.findByIdAndUpdate(
		req.session.user.id,
		{
			$set : req.file
				? { username, email, name, profileImage: '/uploads/' + req.file.filename }
				: { username, email, name }
		},
		{ useFindAndModify: false }
	);

	res.redirect('/user/profile/settings');
});

module.exports = router;
