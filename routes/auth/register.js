const router = require('express').Router();
const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../../middlewear/validation');

router.post('/', async (req, res) => {
	// Validate req body
	const { error } = registerValidation(req.body);

	// Check if any errors happend during balidation
	if (error) return res.status(400).send(error.details[0].message);

	// Check if user is already in database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email already exsits. Please login.');

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new user
	const user = new User({
		username : req.body.username,
		email    : req.body.email,
		password : hashPassword
	});
	try {
		const saveUser = await user.save();
		res.redirect('/login');
		console.log('Just saved a new user ' + saveUser);
	} catch (err) {
		res.status(400).send('Something went wrong ' + err);
	}
});

router.get('/', (req, res) => {
	res.render('user/register');
});

module.exports = router;
