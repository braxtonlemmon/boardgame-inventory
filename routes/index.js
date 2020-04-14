const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');
const game_controller = require('../controllers/gameController');
const gameinstance_controller = require('../controllers/gameinstanceController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Board Game Shop' });
});

//////////////////
/* GAME routes */
////////////////

// GET request for creating game
router.get('/game/create', game_controller.game_create_get);

// POST request for creating game
router.post('/game/create', game_controller.game_create_post);

// GET request for deleting game
router.get('/game/:id/delete', game_controller.game_delete_get);

// POST request for deleting game
router.post('/game/:id/delete', game_controller.game_delete_post);

// GET request for updating game
router.get('/game/:id/update', game_controller.game_update_get);

// POST request for updating game
router.post('/game/:id/update', game_controller.game_update_post);

// GET request for one game
router.get('/game/:id', game_controller.game_detail);

// GET request for all games
router.get('/games', game_controller.game_list);

//////////////////////
/* CATEGORY routes */
////////////////////

// GET request for creating category
router.get('/category/create', category_controller.category_create_get);

// POST request for creating category
router.post('/category/create', category_controller.category_create_post);

// GET request for deleting category
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request for deleting category
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request for updating category
router.get('/category/:id/update', category_controller.category_update_get);

// POST request for updating category
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category
router.get('/category/:id', category_controller.category_detail);

// GET request for all categories
router.get('/categories', category_controller.category_list);

//////////////////////////
/* GAMEINSTANCE routes */
////////////////////////

// GET request for creating gameinstance
router.get('/gameinstance/create', gameinstance_controller.gameinstance_create_get);

// POST request for creating gameinstance
router.post('/gameinstance/create', gameinstance_controller.gameinstance_create_post);

// GET request for deleting gameinstance
router.get('/gameinstance/:id/delete', gameinstance_controller.gameinstance_delete_get);

// POST request for deleting gameinstance
router.post('/gameinstance/:id/delete', gameinstance_controller.gameinstance_delete_post);

// GET request for updating gameinstance
router.get('/gameinstance/:id/update', gameinstance_controller.gameinstance_update_get);

// POST request for updating gameinstance
router.post('/gameinstance/:id/update', gameinstance_controller.gameinstance_update_post);

// GET request for one gameinstance
router.get('/gameinstance/:id', gameinstance_controller.gameinstance_detail);

// GET request for all gameinstances
router.get('/gameinstances', gameinstance_controller.gameinstance_list);

module.exports = router;
