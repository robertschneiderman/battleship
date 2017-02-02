const User = require('../models/user');
const helpers = require('../board_helpers');
const getRandCoords = helpers.getRandCoords;


const getUnattackedRandomMove = (game) => {
    let randomCoords = getRandCoords();
    let userBoard = game.boards[0];

    let space = getSpace(userBoard.grid, randomCoords);
    while (space.attacked) {
        randomCoords = getRandCoords();
        space = getSpace(userBoard.grid, randomCoords);
    }
    return randomCoords;
};

const incrementCoord = (coord, vertical) => {
    return (vertical) ? [coord[0]+1, coord[1]] : [coord[0], coord[1]+1];
};

const decrementCoord = (coord, vertical) => {
    return (vertical) ? [coord[0]-1, coord[1]] : [coord[0], coord[1]-1];
};

const getSpace = (board, coord) => {
    return board[coord[0]][coord[1]];
};

const getSpaces = (board, coords) => {
    let spaces = coords.map(coord => {
        return board[coord[0]][coord[1]];
    });
    return spaces.reverse();
};

const getJumpMove = (moves, vertical) => {
    let idx = (vertical) ? 1 : 0;
    for (let i = moves.length-2; i >= 0; i++) {
        let mov = moves[i];
        let prevMov = moves[i-1];

            
        if (prevMov[idx] >= mov[idx]) return mov;
    }
};

const aiMove = (game, changedMode) => {
    let {mode, moves} = game.ai;
    mode = changedMode ? changedMode : mode;
    let board = game.boards[0];
    moves = moves.reverse();
    let spaces = getSpaces(board, moves);
    let pivotSpace;

    if (spaces[0].ship !== 'blank' && mode === 'random') mode = 'attackHo';
    if (spaces[0].ship === 'blank' && spaces[1].ship === 'blank' && mode === 'attackHo') mode = 'attackVert';
    if (spaces[0].ship === 'blank' && spaces[1].ship !== 'blank' && spaces[2].ship !== 'blank') pivotSpace = getJumpMove(moves, (mode === 'attackVert'));

    pivotSpace = pivotSpace ? pivotSpace : moves[0];

    let nextCoord = incrementCoord(pivotSpace, (mode === 'attackVert'));
    let previousCoord = decrementCoord(pivotSpace, (mode === 'attackVert'));

    let nextSpace = getSpace(board, nextCoord);
    let previousSpace = getSpace(board, previousCoord);

    
    let move;

    if (mode === 'random') return getRandCoords();
    
    if (mode === 'attackHo') {
        move = !nextSpace.attacked ? nextCoord : !previousSpace.attacked ? previousCoord : aiMove(game, 'attackVert');
    }

    return move;
};

const isGameOver = ships => {
    for (let i = 0; i < ships.length; i++) {
        let ship = ships[i];
        if (ship.hits !== ship.capacity) return 'playing';
    }
    return 'over';
};
    // let lastCoord = moves[moves.length-1];
    // let secondTolastCoord = moves[moves.length-2];
    // let thirdTolastCoord = moves[moves.length-3];
    // let lastMove = getSpace(board, lastCoord);
    // let secondTolastMove = getSpace(board, secondTolastCoord);
    // let thirdTolastMove = getSpace(board, thirdTolastCoord);

exports.attack = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    let game = user.games[user.games.length-1];
    let move, winner, boardIdx;

    if (!Array.isArray(req.body)) {
        boardIdx = 0;
        move = getUnattackedRandomMove(game);
    } else {
        boardIdx = 1;
        move = req.body;        
    }
    let board = game.boards[boardIdx];

    if (game.start) game.start = false;
    game.turn = (game.turn + 1) % 2;
    board.grid[move[0]][move[1]].attacked = true;

    let message = 'Miss!';

    board.ships.forEach(ship => {
        ship.coordinates.forEach(coord => {
            if (coord[0] === move[0] && coord[1] === move[1]) {
                ship.hits += 1;
                message = 'Hit!';
                if (ship.hits === ship.capacity) {
                    message = `${ship.name} sunk!!!`;                
                }
            }
        });
    });

    let status = isGameOver(board.ships);
    game.status = status;

    if (status === 'over') {
        winner = (game.turn === 0) ? 'Chuck Norris' : 'You';
        game.winner = winner;
    }

    user.games[0].boards[game.turn].markModified('grid');
    user.save(function(err) {
      if (err) { return next(err); }
    //   let grid = game.boards[1].grid;
    //   game.boards[1].grid.save(function(err) {
        // if (err) { return next(err); }
      res.json({board, game, message, status, winner});
    //   });
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};