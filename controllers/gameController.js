const Game = require('../models/game');
const GameInstance = require('../models/gameinstance');
const Category = require('../models/category');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Index
exports.game_list = function(req, res, next) {
  Game.find({}, 'name')
    .exec(function (err, list_games) {
      if (err) { return next(err) }
      res.render('game_list', { title: 'Games', game_list: list_games });
    });
};

exports.game_detail = function(req, res, next) {
  async.parallel({
    game: function(callback) {
      Game.findById(req.params.id)
      .populate('category')
      .exec(callback)
    },
    game_instance: function(callback) {
      GameInstance.find({ 'game': req.params.id })
      .exec(callback)
    },
  }, function (err, results) {
    if (err) { return next(err) }
    if (results.game === null) {
      const err = new Error('Game not found');
      err.status = 404;
      return next(err);
    }
    res.render('game_detail', { title: results.game.name, game: results.game, game_instances: results.game_instance });
  })
};

exports.game_create_get = function(req, res, next) {
  Category.find({}, 'name')
  .exec(function (err, category_list) {
    if (err) { return next(err) }
    res.render('game_form', { title: 'New Game', category_list: category_list });
  })
};

exports.game_create_post = [
  body('name', 'Game name must not be empty.').trim().isLength({ min: 1 }),
  body('description', 'Game description must not be empty.').trim().isLength({ min: 1 }),
  body('price', 'Game price must not be empty.').trim().isInt({ min: 1 }),
  body('qty', 'Game quantity must not be empty.').trim().isInt({ min: 0 }),

  body('*').escape(),
  body('category.*').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const game = new Game(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        qty: req.body.qty,
        category: req.body.category
      }
    )
    if (!errors.isEmpty()) {
      Category.find({}, 'name')
      .exec(function (err, category_list) {
        if (err) { return next(err) }
        res.render('game_form', { title: 'Create Book', game: game, category_list: category_list, errors: errors.array() });
      });
      return;
    }
    else {
      game.save(function (err) {
        if (err) { return next(err) }
        res.redirect(game.url);
      })
    }
  }
];

exports.game_delete_get = function(req, res, next) {
  async.parallel({
    game_instances: function(callback) {
      GameInstance.find({ 'game': req.params.id })
      .exec(callback)
    },
    game: function(callback) {
      Game.findById(req.params.id)
      .exec(callback)
    }
  }, function (err, results) {
    if (err) { return next(err) }
    if (results.game === null) {
      res.redirect('/games');
    }
    res.render('game_delete', { title: 'Delete Game', game_instances: results.game_instances, game: results.game });
  });
};

exports.game_delete_post = function (req, res, next) {
  async.parallel({
    game_instances: function(callback) {
      GameInstance.find({ 'game': req.params.id })
      .exec(callback)
    },
    game: function(callback) {
      Game.findById(req.params.id)
      .exec(callback)
    }
  }, function (err, results) {
    if (err) { return next(err) }
    if (results.game_instances.length > 0) {
      res.render('game_delete', { title: 'Delete Game', game_instances: results.game_instances, game: results.game });
      return;
    }
    else {
      Game.findByIdAndRemove(req.body.gameid, function deleteGame(err) {
        if (err) { return next(err) }
        res.redirect('/games');
      });
    }
  });
};


exports.game_update_get = function (req, res) {
  res.send('game update get');
};

exports.game_update_post = function(req, res) {
  res.send('game update post');
};