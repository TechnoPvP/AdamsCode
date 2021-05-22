const mysql = require("mysql");
require('dotenv').config();

// TODO Better connection system

var con = mysql.createPool({
  connectionLimit: 10,
  host: "adamscode.c26d0vgothf5.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  database: "Posts",
  password: `${process.env.DB_PASSWORD}`,
});


con.getConnection((err, connection) => {
  if (err) throw err;
  // console.log(`Connected as ${connection.threadId}!`);
});

var getPost = function(id) {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM posts WHERE ID = ?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

var getAllPost = function(limit) {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM posts LIMIT ${limit}`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

var addPost = function(author, heading, content) {
  let sql = `INSERT into posts (author, heading, content) VALUES ('${author}', '${heading}', '${content}')`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}

var addPostBody = function(body) {
  let sql = `INSERT into posts (author, heading, content) VALUES ('${body.author}', '${body.heading}', '${body.content}')`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}



module.exports = { addPost, getPost, getAllPost, addPostBody};