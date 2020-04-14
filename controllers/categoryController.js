const Category = require('../models/category');

// Index
exports.category_list = function(req, res) {
  res.send('Category list');
};

exports.category_detail = function(req, res) {
  res.send('Category detail');
};

exports.category_create_get = function(req, res) {
  res.send('category create get');
};

exports.category_create_post = function (req, res) {
  res.send('category create post');
}

exports.category_delete_get = function(req, res) {
  res.send('category delete get');
};

exports.category_delete_post = function (req, res) {
  res.send('category delete post');
};

exports.category_update_get = function (req, res) {
  res.send('category update get');
};

exports.category_update_post = function(req, res) {
  res.send('category update post');
};