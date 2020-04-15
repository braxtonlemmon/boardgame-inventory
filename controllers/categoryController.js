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

exports.category_create_get = function(req, res, next) {
  res.render('category_form', { title: 'New Category' });
};

exports.category_create_post = [
  body('name', 'Category name required').trim().isLength({ min: 1 }),
  body('description', 'Category description required').trim().isLength({ min: 1 }),
  body('name').escape(),
  body('description').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category(
      { 
        name: req.body.name,
        description: req.body.description
       }
    );
    if (!errors.isEmpty()) {
      res.render('category_form', { title: 'New Category', category: category, errors: errors.array() });
      return;
    }
    else {
      Category.findOne({ 'name': req.body.name })
        .exec(function (err, found_category) {
          if (err) { return next(err) }
          if (found_category) {
            res.redirect(found_category.url);
          }
          else {
            category.save(function (err) {
              if (err) { return next(err) }
              res.redirect(category.url);
            });
          }
        });
    }
  }
];

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