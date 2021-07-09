const router = require('express').Router();
const blogRouter = require('./blog');

router.get('/', (req, res) => {
	res.send('Reached API endpoint');
});

router.use('/blog', blogRouter);

module.exports = router;
