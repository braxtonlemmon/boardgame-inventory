const Game = require('../models/game');

// Index
exports.game_list = function(req, res) {
  res.send('game list');
};

exports.game_detail = function(req, res) {
  res.send('game detail');
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