const express = require('express');
const router = express.Router();
const db = require('../../utils/postUtil');
const { auth } = require('../../middlewear/auth');
const Post = require('../../model/Post');
const multer = require('multer');
const { commentValidation, test } = require('../../middlewear/validation');
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
	res.send('Reached DB END point');
});

router.get('/blog/:slug', async (req, res) => {
	try {
		const { slug } = req.params;
		const result = await Post.findBySlug(slug);

		if (!result) return res.status(400).send('No blog post found with slug ' + slug);

		res.render('post', { result, user: req.session.user, comments: result.comments });
	} catch (e) {
		console.error(e);
	}
});

router.post('/blog/create', auth, async (req, res) => {
	console.log('Blog Created');
	const { heading, content, author } = req.body;
	const slug = heading.replace(/[^a-z0-9]/gi, '-').toLowerCase();

	if ((!heading, !content, !author)) return res.status(400).send('Invalid not working.');

	// TODO Make client side
	Post.create({ heading: heading, date: Date.now(), content: content, author: author, slug: slug }, (err) => {
		if (err) return res.status(400).send('Post cannot be created.' + err);

		console.log(`[Info] A new post has been created by ${author}`);
		res.redirect('/');
	});
});

router.get('/blog/:slug/:comment', (req, res) => {
	res.send('Reached blog endpoint for ' + req.params.slug + ' with ' + req.params.comment);
});

// Post a comment
router.post('/blog/:slug/comment', auth, async (req, res) => {
	/**
	 * TODO
	 * - Check if theyre authrized.
	 */

	// Check if request is empty
	if (!req.body) return req.flash('error', 'Comment body was empty, please enter a comment.');

	// Set username
	req.body.username = req.session.user.username;

	// Validate Input Using Joi
	const { error } = commentValidation(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		req.flash('error', error);
		return;
	}

	// Get the username, comment body, and id of post.
	const { body } = req.body;
	const user = req.session.user;

	const id = await Post.findOne({ slug: req.params.slug }, '_id');

	// Add comment to database.
	Post.updateOne({ _id: id }, { $push: { comments: [ { username: user.username, body: body } ] } }, (err, result) => {
		if (err) return res.send(400, 'Unable to add comment to databse ' + err);

		return res.redirect(req.get('referer'));
	});
});

module.exports = router;
