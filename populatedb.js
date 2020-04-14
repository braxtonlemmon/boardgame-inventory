#! /usr/bin/env node

console.log(
  "This script populates some test games, categories, and gameinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
const Game = require('./models/game');
const Category = require('./models/category');
const GameInstance = require('./models/gameinstance');

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let games = [];
let categories = [];
let gameinstances = [];

function gameCreate(name, description, category, price, qty, cb) {
  gamedetail = { name, description, category, price, qty };
  const game = new Game(gamedetail);
  game.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Game: ${game}`);
    games.push(game);
    cb(null, game);
  });
}

function categoryCreate(name, description, cb) {
  const category = new Category({ name: name, description: description });
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Category: ${category}`);
    categories.push(category);
    cb(null, category);
  });
}

function gameInstanceCreate(game, language, condition, price, cb) {
  gameinstancedetail = { game: game, condition: condition, price: price };
  if (language !== false) gameinstancedetail.language = language;

  const gameinstance = new GameInstance(gameinstancedetail);
  gameinstance.save(function (err) {
    if (err) {
      console.log(`ERROR CREATING GameInstance: ${gameinstance}`);
      cb(err, null);
      return;
    }
    console.log(`New GameInstance: ${gameinstance}`);
    gameinstances.push(gameinstance);
    cb(null, gameinstance);
  });
};

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          'Abstract', 
          'Minimal theme, minimal randomness',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Party',
          'Simple gameplay that encourages social interaction for large groups',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Cooperative',
          'Non-competitive where everyone works as a team toward and end goal',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Deck-Building',
          'The main focus of the game is to construct a deck',
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

function createGames(cb) {
  async.parallel(
    [
      function (callback) {
        gameCreate(
          "Santorini",
          "Santorini is an accessible strategy game, simple enough for an elementary school classroom while aiming to provide gameplay depth and content for hardcore gamers to explore.",
          categories[0],
          30,
          2,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Azul",
          "In the game Azul, players take turns drafting colored tiles from suppliers to their player board. Later in the round, players score points based on how they've placed their tiles to decorate the palace. Extra points are scored for specific patterns and completing sets; wasted supplies harm the player's score. The player with the most points at the end of the game wins.",
          categories[0],
          44,
          0,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Codenames",
          "In the game Azul, players take turns drafting colored tiles from suppliers to their player board. Later in the round, players score points based on how they've placed their tiles to decorate the palace. Extra points are scored for specific patterns and completing sets; wasted supplies harm the player's score. The player with the most points at the end of the game wins.",
          categories[1],
          16,
          2,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Sushi Go!",
          "In the super-fast sushi card game Sushi Go!, you are eating at a sushi restaurant and trying to grab the best combination of sushi dishes as they whiz by. Score points for collecting the most sushi rolls or making a full set of sashimi. Dip your favorite nigiri in wasabi to triple its value! And once you've eaten it all, finish your meal with all the pudding you've got! But be careful which sushi you allow your friends to take; it might be just what they need to beat you!",
          categories[1],
          19,
          1,
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Pandemic",
          "In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand.",
          categories[2],
          47,
          3,
          callback 
        )
      }
    ],
    cb
  )
}

function createGameInstances(cb) {
  async.parallel(
    [
      function (callback) {
        gameInstanceCreate(
          games[0],
          false,
          'Excellent',
          25,
          callback
        );
      },
      function (callback) {
        gameInstanceCreate(
          games[0],
          'English',
          'Fair',
          20,
          callback
        );
      },
      function (callback) {
        gameInstanceCreate(
          games[2],
          'German',
          'New',
          15,
          callback
        );
      },
      function (callback) {
        gameInstanceCreate(
          games[2],
          false,
          'Poor',
          5,
          callback
        );
      },
      function (callback) {
        gameInstanceCreate(
          games[3],
          'English',
          'Good',
          10,
          callback
        );
      },
      function (callback) {
        gameInstanceCreate(
          games[4],
          'French',
          'Good',
          35,
          callback
        );
      },
      function (callback) {
        gameInstanceCreate(
          games[4],
          'English',
          'New',
          40,
          callback
        );
      },
      function (callback) {
        gameInstanceCreate(
          games[4],
          'English',
          'Fair',
          20,
          callback
        );
      }
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createCategories, createGames, createGameInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("GAMEInstances: " + gameinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
