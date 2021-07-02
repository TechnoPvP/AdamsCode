const router = require('express').Router();
const { auth } = require('../../middlewear/auth');

router.get('/', auth, (req, res) => {
	res.render('user/create_post', { user: req.session.user });
});

module.exports = router;
