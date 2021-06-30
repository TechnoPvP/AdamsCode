const router = require('express').Router();

router.get('/', (req, res) => {
	if (!req.session) res.status(200).redirect('/');
	req.session.destroy((err) => {
		if (err) res.status(400).send('Unable to logout');

		res.redirect('/');
	});
});

router.post('/', (req, res) => {
	if (!req.session) res.status(200).redirect('/');
	req.session.destroy((err) => {
		if (err) res.status(400).send('Unable to logout');

		res.redirect('/');
	});
});

module.exports = router;
