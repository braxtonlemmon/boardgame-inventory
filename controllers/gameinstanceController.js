const GameInstance = require('../models/gameinstance');

// Index
exports.gameinstance_list = function(req, res) {
  res.send('gameinstance list');
};

exports.gameinstance_detail = function(req, res) {
  res.send('gameinstance detail');
};

exports.gameinstance_create_get = function(req, res) {
  res.send('gameinstance create get');
};

exports.gameinstance_create_post = function (req, res) {
  res.send('gameinstance create post');
}

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