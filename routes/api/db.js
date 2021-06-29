const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
	res.send('Reached DB END point');
});

router.get('/blog/:blogID', (req, res) => {
	db
		.getPost(req.params.blogID)
		.then((result) => {
			res.render('post', { post: result[0] });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).redirect('/');
		});
});

router.post('/create', (req, res) => {
	console.log('Blog Created');

	delete req.body.submit;

	// TODO Make client side
	db.addPostBody(req.body);
	res.redirect('/');
});

router.get('/:id', (req, res) => {
	res.status(200);
	res.send('Looking up data for ' + req.params.id);
	db
		.getPost(req.params.id)
		.then((result) => {
			console.log(result[0].author);
			console.log(result[0].heading);
			console.log(result[0].content);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
