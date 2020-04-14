const Game = require('../models/game');
const GameInstance = require('../models/gameinstance');
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

exports.game_create_get = function(req, res) {
  res.send('game create get');
};

exports.game_create_post = function (req, res) {
  res.send('game create post');
}

exports.game_delete_get = function(req, res) {
  res.send('game delete get');
};

exports.game_delete_post = function (req, res) {
  res.send('game delete post');
};

exports.game_update_get = function (req, res) {
  res.send('game update get');
};

exports.game_update_post = function(req, res) {
  res.send('game update post');
};