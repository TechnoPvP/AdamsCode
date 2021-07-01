const router = require('express').Router();
const User = require('../../model/User');
const { auth } = require('../../middlewear/auth');
const flash = require('connect-flash');

const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../../middlewear/validation');
require('dotenv').config();

router.get('/', (req, res) => {
	// Check if they're already logged in.
	if (req.session.user) return res.status(200).redirect('/');
	if (req.flash('error')) {
		res.render('user/login', { error: req.flash('error') });
	} else {
		res.render('user/login');
	}
});

router.post('/', async (req, res, next) => {
	// Validate req body
	const { error } = loginValidation(req.body);
	const { email, password } = req.body;

	// Check if any errors happend during balidation
	if (error) {
		req.flash('error', `Login Error: ${error.details[0].message}`);
		console.log(req.flash('error')[0]);
		return res.redirect('/login');
	}
	// Check if email and password match
	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			req.flash('error', `User does not exsist in our system.`);
			console.log(req.flash('error'));
			return res.redirect('/login');
		}

		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) {
			req.flash('error', `Invalid username or password pleaes try again`);
			console.log(req.flash('error'));
			return res.redirect('/login');
		}

		// TODO Create session
		req.session.user = {
			id       : user._id,
			email    : user.email,
			username : user.username,
			role     : 'default'
		};
		console.log('Session has been created for user ' + user.email);
		res.status(200).redirect('/');
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
