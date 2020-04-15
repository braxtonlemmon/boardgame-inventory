const GameInstance = require('../models/gameinstance');
const Game = require('../models/game');
const { body,  validationResult } = require('express-validator');

// Index
exports.gameinstance_list = function(req, res, next) {
  GameInstance.find()
    .populate('game')
    .exec(function (err, list_gameinstances) {
      if (err) { return next(err) }
      res.render('gameinstance_list', { title: 'Game Copies', gameinstance_list: list_gameinstances });
    });
};

exports.gameinstance_detail = function(req, res, next) {
  GameInstance.findById(req.params.id)
  .populate('game')
  .exec(function (err, gameinstance) {
    if (err) { return next(err) }
    if (gameinstance === null) {
      const err = new Error('Game instance not found');
      err.status = 404;
      return next(err);
    }
    res.render('gameinstance_detail', { title: "Previously Owned", gameinstance: gameinstance });
  });
};

exports.gameinstance_create_get = function(req, res, next) {
  Game.find({}, 'name')
  .exec(function (err, game_list) {
    if (err) { return next(err) }
    res.render('gameinstance_form', { title: 'Create Used Copy', game_list: game_list });
  });
};

exports.gameinstance_create_post = [
  body('game', 'Game must be specified.').trim().isLength({ min: 1 }),
  body('language', 'Language must be specified').trim().isLength({ min: 1 }),
  body('condition', 'Condition must be specified').trim().isLength({ min: 1 }),
  body('price', 'Price must be specified').trim().isInt({ min: 1 }),

  body('*').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const gameinstance = new GameInstance(
      {
        game: req.body.game,
        language: req.body.language,
        condition: req.body.condition,
        price: req.body.price
      }
    )
    if (!errors.isEmpty()) {
      Game.find({}, 'name')
      .exec(function (err, game_list) {
        if (err) { return next(err) }
        res.render('gameinstance_form', { title: 'Create Used Copy', gameinstance: gameinstance, game_list: game_list, errors: errors.array() });
      })
      return;
    } 
    else {
      gameinstance.save(function (err) {
        if (err) { return next(err) }
        res.redirect(gameinstance.url);
      })
    }
  }
]

exports.gameinstance_delete_get = function(req, res) {
  res.send('gameinstance delete get');
};

exports.gameinstance_delete_post = function (req, res) {
  res.send('gameinstance delete post');
};

exports.gameinstance_update_get = function (req, res) {
  res.send('gameinstance update get');
};

exports.gameinstance_update_post = function(req, res) {
  res.send('gameinstance update post');
};