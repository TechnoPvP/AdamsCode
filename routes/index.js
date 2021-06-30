const express = require('express');
const db = require('../utils/postUtil');
const Post = require('../model/Post');
const router = express.Router();

router.get('/', async (req, res, next) => {
	/**
	 * What to do here
	 * 
	 * 1.) Change the method from SQL to MONGO - CHECK
	 * 2.) Create new mongoUtil - CHECK not needed after all
	 */
	const result = await Post.find({});
	res.render('index', { posts: result });
});

router.get('/test', (req, res) => {
	res.render('user/register.pug');
});

module.exports = router;
