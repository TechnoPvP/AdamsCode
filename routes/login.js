const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    /*
    1.) Check if they have an active session running.
        If so show them login menu
        If not render redriect to /create
    */

    res.render("login");
});

router.get('/create', (req, res) => {
    res.render('create', {});
});

module.exports = router;