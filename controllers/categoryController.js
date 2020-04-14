const Category = require('../models/category');
const Game = require('../models/game');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Index
exports.category_list = function(req, res, next) {
  Category.find({}, 'name')
    .exec(function (err, list_categories) {
      if (err) { return next(err) }
      res.render('category_list', { title: 'Categories', category_list: list_categories });
    })
  
};

exports.category_detail = function(req, res, next) {
  async.parallel({
    category: function(callback) {
      Category.findById(req.params.id)
      .exec(callback);
    },
    category_games: function(callback) {
      Game.find({ 'category': req.params.id })
      .exec(callback);
    },
  }, function(err, results) {
    if (err) { return next(err) }
    if (results.category === null) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    res.render('category_detail', { title: results.category.name, category: results.category, category_games: results.category_games });
  });
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