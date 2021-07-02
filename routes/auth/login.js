const router = require('express').Router();
const User = require('../../model/User');
const { auth } = require('../../middlewear/auth');

const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../../middlewear/validation');
require('dotenv').config();

router.get('/', (req, res) => {
	// Check if they're already logged in.
	if (req.session.user) return res.status(200).redirect('/');

	res.render('user/login', { flash: req.flash() });
});

router.post('/', async (req, res) => {
	// Validate req body
	const { error } = loginValidation(req.body);

	// Check if any errors happend during balidation
	if (error) {
		req.flash('error', error.details[0].message);
		return res.render('user/login', { flash: req.flash() });
	}
	// Check if email and password match
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });
		if (!user) {
			req.flash('error', `Invalid username please try again`);
			return res.render('user/login', { flash: req.flash() });
		}

		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) {
			req.flash('error', `Invalid username or password please try again`);
			return res.render('user/login', { flash: req.flash() });
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
