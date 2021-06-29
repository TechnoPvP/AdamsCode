const express = require('express');
const db = require('../utils/postUtil');
const router = express.Router();

router.get('/', (req, res, next) => {
	/**
	 * What to do here
	 * 
	 * 1.) Change the method from SQL to MONGO
	 * 2.) Create new mongoUtil
	 */

	db.getAllPost(20).then((result) => {
		res.render('index', { posts: result });
		console.log(result);
	});
});

router.get('/test', (req, res) => {
	res.render('user/register.pug');
});

module.exports = router;
