const router = require('express').Router();
const createRoute = require('./create');
const profileRoute = require('./profile');

router.use('/create', createRoute);
router.use('/profile', profileRoute);

module.exports = router;
