const express = require('express');
const router = express.Router();
const db = require('../../utils/postUtil');
const Post = require('../../model/Post');
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
	res.send('Reached DB END point');
});

router.get('/blog/:slug', async (req, res) => {
	const { slug } = req.params;
	const result = await Post.findBySlug(slug);
	if (!result) return res.status(400).send('No blog post found with slug ' + slug);

	res.render('post', { result });
});

router.post('/create', async (req, res) => {
	console.log('Blog Created');
	const { heading, content, author } = req.body;
	const slug = heading.replace(/[^a-z0-9]/gi, '-').toLowerCase();

	// TODO Make client side
	Post.create({ heading: heading, date: Date.now(), content: content, author: author, slug: slug }, (err) => {
		if (err) return res.status(400).send('Post cannot be created.' + err);

		console.log(`[Info] A new post has been created by ${author}`);
		res.redirect('/');
	});
});

module.exports = router;
