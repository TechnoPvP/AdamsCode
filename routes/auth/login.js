const router = require('express').Router();
const User = require('../../model/User');
const { auth } = require('../../middlewear/auth');

const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../../middlewear/validation');
require('dotenv').config();

router.get('/', (req, res) => {
	// Check if they're already logged in.
	if (req.session.user) return res.status(200).redirect('/user.html');

	res.render('user/login');
});

router.get('/pro', auth, (req, res) => {
	if (req.session.user) {
		res.send('Auth in this bitch');
	} else {
		res.send('Not authrized please leave.');
	}
});

router.post('/', async (req, res) => {
	// Validate req body
	const { error } = loginValidation(req.body);
	const { email, password } = req.body;

	// Check if any errors happend during balidation
	if (error) return res.status(400).send(error.details[0].message);

	// Check if email and password match
	const user = await User.findOne({ email: email });
	if (!user) return res.status(400).send('Invalid username or password');

	const validPass = await bcrypt.compare(password, user.password);
	if (!validPass) return res.status(400).send('Invalid username or password');

	// TODO Create session
	req.session.user = {
		id    : user._id,
		email : user.email,
		role  : 'default'
	};
	console.log('Session has been created for user ' + user.email);
	res.status(200).redirect('/user.html');
});

module.exports = router;
