const router = require('express').Router();
const blogRouter = require('./blog');
const inviroRouter = require('./inviro');

router.get('/', (req, res) => {
	res.send('Reached API endpoint');
});

router.use('/blog', blogRouter);
router.use('/inviro', inviroRouter);

module.exports = router;
