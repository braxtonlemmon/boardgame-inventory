const GameInstance = require('../models/gameinstance');

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