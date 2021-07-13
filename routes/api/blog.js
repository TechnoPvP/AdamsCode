const router = require('express').Router();
const db = require('../../utils/postUtil');
const User = require('../../model/User');
const { auth } = require('../../middlewear/auth');
const Post = require('../../model/Post');
const { commentValidation, test } = require('../../middlewear/validation');
const { UnavailableForLegalReasons } = require('http-errors');

router.post('/create', auth, async (req, res) => {
	console.log('Blog Created');
	const { heading, content, author } = req.body;
	const slug = heading.trim().replace(/[^a-z0-9]/gi, '-').toLowerCase();

	if ((!heading, !content, !author)) return res.status(400).send('Invalid not working.');

	// TODO Make client side
	Post.create({ heading: heading, date: Date.now(), content: content, author: author, slug: slug }, (err) => {
		if (err) return res.status(400).send('Post cannot be created.' + err);

		console.log(`[Info] A new post has been created by ${author}`);
		res.redirect('/');
	});
});

// Load the post data route.
router.get('/:slug', async (req, res) => {
	try {
		// Makesure the slug is in the database
		const post = await Post.findBySlug(req.params.slug);
		if (!post) return res.status(400).send('No blog post found with slug ' + slug);

		const userId = req.session.user && req.session.user.id;
		let user;
		if (userId) {
			user = await User.findById(userId);
		} else {
			user = null;
		}

		if (!post.comments) {
			res.render('post', user ? { post, user } : { post });
			return;
		}
		let comments = post.comments.map(async (comment) => {
			//  Needs an object but providing it a string

			const userQuery = await User.findById(comment.userId).exec();
			return {
				...comment,
				username     : userQuery.username,
				profileImage : userQuery.profileImage
			};
		});

		Promise.all(comments)
			.then((result) => {
				res.render('post', user ? { post, user, comments: result } : { post });
			})
			.catch((e) => console.log(e));
	} catch (e) {
		console.error(e);
	}
});

// Post a comment
router.post('/:slug/comment', auth, async (req, res) => {
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

	// Check if there was an erroe getting the comment.
	try {
		await Post.findOneAndUpdate(
			{ slug: req.params.slug },
			{ $push: { comments: { userId: user.id, body } } },
			{ useFindAndModify: false }
		);

		// If Scuessful comment show them the page again.
		// TODO Scroll them down.
		res.redirect(req.get('referer'));
	} catch (e) {
		res.send(400, 'Unable to add comment to databse ' + err);
	}
});

module.exports = router;
