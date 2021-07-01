const express = require('express');
const db = require('../utils/postUtil');
const Post = require('../model/Post');
const User = require('../model/User');
const router = express.Router();

router.get('/', async (req, res, next) => {
	/**
	 * What to do here
	 * 
	 * 1.) Change the method from SQL to MONGO - CHECK
	 * 2.) Create new mongoUtil - CHECK not needed after all
	 */
	try {
		const userSession = req.session.user;
		const allPost = await Post.find({});

		if (userSession) {
			const user = await User.findById(userSession.id);
			return res.render('index', { posts: allPost, user: user });
		} else {
			return res.render('index', { posts: allPost });
		}
	} catch (err) {
		res.status(404).send('Error' + err);
	}
});

router.get('/test', (req, res) => {
	res.render('user/register.pug');
});

module.exports = router;
