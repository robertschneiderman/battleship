const User = require('../models/user');

exports.attack = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let game = user.games[user.games.length-1];
    if (game.start) game.start = false;
    game.turn = (game.turn + 1) % 2;
    game.boards[1].grid[req.body[0]][req.body[0]].attacked = true;
    

    user.games[0].boards[1].markModified('grid');
    user.save(function(err) {
      if (err) { return next(err); }
    //   let grid = game.boards[1].grid;
    //   game.boards[1].grid.save(function(err) {
        // if (err) { return next(err); }
      res.json({board: game.boards[1], turn: game.turn});
    //   });
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};