const User = require('../models/user');

const helpers = require('../board_helpers');
const ships = helpers.ships;
const shipsCopy = helpers.shipsCopy;
const populateGrid = helpers.populateGrid;

exports.new = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let grid1 = populateGrid(ships);
    let grid2 = populateGrid(shipsCopy); 

    let game = {
        boards: [{grid: grid1, ships: ships}, {grid: grid2, ships: shipsCopy}]
    };

    user.games.push(game);
    

    user.save(function(err) {
      if (err) { return next(err); }
    //   let grid = game.boards[1].grid;
    //   game.boards[1].grid.save(function(err) {
        // if (err) { return next(err); }
      res.json({game});
    //   });
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};