const database = require('../infra/database');

exports.getPosts = function () {
  return database.query("SELECT * FROM blog.posts;");
};

exports.getPost = function (id) {
  return database.oneOrNone(`SELECT * FROM blog.posts WHERE id = ${id}`);
};

exports.savePost = function (post) {
  return database.one("INSERT INTO blog.posts (title, content) VALUES ($1, $2) returning *", [post.title, post.content]);
};

exports.updatePost = function (id, post) {
  return database.none("UPDATE blog.posts SET title = $1, content = $2 WHERE id = $3", [post.title, post.content, id]);
};

exports.deletePost = function (id) {
  return database.none(`DELETE FROM blog.posts WHERE id = ${id}`);
};
