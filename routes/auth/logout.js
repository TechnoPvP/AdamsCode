const router = require('express').Router();

router.post('/', (req, res) => {
	if (!req.session) res.status(200).redirect('/');
	req.session.destroy((err) => {
		if (err) res.status(400).send('Unable to logout');

		console.log('Logged out apparently');
		res.redirect('/');
	});
});

module.exports = router;
