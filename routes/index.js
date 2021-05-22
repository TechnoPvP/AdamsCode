const express = require('express');
const db = require("../public/scripts/dbUtil")
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  db.getAllPost(20).then(result => {
   res.render("index", {posts: result});
 });
});

module.exports = router;
