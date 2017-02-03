const User = require('../models/user');
const helpers = require('../board_helpers');
const getRandCoords = helpers.getRandCoords;


const stc = str => {
    if (str === "") return [];
    let arr = str.split(',');
    arr = arr.map(el => parseInt(el));

    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 !== 0) {
            result.push([arr[i-1], arr[i]]);
        }
    }
    return result;
};

const cts = coords => {
    let resultStr = '';
    coords.slice(1).forEach(coord => {
        resultStr += `,${coord[0]},${coord[1]}`;
    });
    return resultStr.slice(1);
};

const incrementCoord = (coord, vertical) => {
    return (vertical) ? [coord[0]+1, coord[1]] : [coord[0], coord[1]+1];
};

const decrementCoord = (coord, vertical) => {
    return (vertical) ? [coord[0]-1, coord[1]] : [coord[0], coord[1]-1];
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

const getUnattackedRandomMove = (grid) => {
    let randomCoords = getRandCoords();

    let space = getSpace(grid, randomCoords);
    while (space.attacked) {
        randomCoords = getRandCoords();
        space = getSpace(grid, randomCoords);
    }
    return randomCoords;
};
const isLastShipDestroyed = (board, lastSpace, ai) => {
    if (lastSpace.ship !== 'blank') {
        for (let i = 0; i < board.ships.length; i++) {
            let ship = board.ships[i];
            if (ship.name === lastSpace.ship && ship.hits === ship.capacity) {
            // if (ship.name === lastSpace.ship && ai.hits === ship.capacity) {
                return ship;
            }
        }
    }
    return false;
};
const getSpace = (grid, coord) => {
    return grid[coord[0]][coord[1]];
};

const moveMissedOrAttacked = (grid, move) => {
    let space = getSpace(grid, move);
    return (space.attacked || space.ship === 'blank');
};

const attacked = (grid, move) => {
    let space = getSpace(grid, move);
    return (space.attacked);
};

const getMovesQueue = (pivot, vertical) => {
    let idxToInc = vertical ? 0 : 1;
    let forwards = ['base'];
    let backwards = ['base'];
    for (let i = 1; i <= 4; i++) {
        let newPivot = pivot.slice(0);
        newPivot[idxToInc] += i;
        if (newPivot[idxToInc] > 9) break;
        forwards.push(newPivot);
    }
    for (let j = 1; j <= 4; j++) {
        let newPivot = pivot.slice(0);
        newPivot[idxToInc] -= j;
        if (newPivot[idxToInc] < 0) break;
        backwards.push(newPivot);
    }    
    return {forwards, backwards};  
};


const getMovesQueueIdx = ai => {
    let add = (ai.attackDir === 'forwards') ? 0 : 1;
    let base = (ai.attackDist - 1) * 2;
    return base + add;
};


const assessMovesQueue = (grid, ai) => {
    // adjust values
    if (ai.attackDir === 'backwards' || (ai.abandonForwards && ai.attackDir === 'backwards') || ai.abandonBackwards) ai.attackDist += 1;

    if (ai.attackDir === 'forwards' && !ai.abandonBackwards) {
        ai.attackDir = 'backwards';
    } else if (ai.attackDir === 'backwards' && !ai.abandonForwards) {
        ai.attackDir = 'forwards';
    } else if (!ai.attackDir) {
        ai.attackDir = 'forwards';
    }

    if (ai.abandonBackwards && ai.abandonForwards) {
        ai.abandonHo = true;
        ai.abandonBackwards = false;
        ai.abandonForwards = false; 
        ai.attackDir = 'forwards';
        ai.attackDist = 1; 
        ai.movesQueueEncoded = getMovesQueue(ai.pivots[0], true);               
    }

    // let curIdxOfMovesQueue = getMovesQueueIdx(ai);

    // fist turn check for ho attacks
    let currentMove = ai.movesQueueEncoded[ai.attackDir][ai.attackDist];

    if (!currentMove) {
        ai.attackDist += 1;
        if (ai.attackDir === 'forwards') {
            ai.attackDir = 'backwards';
            ai.abandonForwards = true;
        } else {
            ai.attackDir = 'forwards';
            ai.abandonBackwards = true;            
        }
        return;
    }

    if (ai.attackDir === 'forwards' && ai.attackDist === 1) {
        if (attacked(grid, currentMove) && attacked(grid, ai.movesQueueEncoded['backwards'][1])) {
            ai.abandonHo = true;
        } else if (!moveMissedOrAttacked(grid, currentMove)) {
            // first space empty
            return; 
        } else {
            ai.abandonForwards = true;
            return;
        }
    }
    // check last move

    if (moveMissedOrAttacked(grid, currentMove)) {        
        if (ai.attackDir === 'forwards') {
            ai.abandonForwards = true;
        } else {
            ai.abandonBackwards = true;
        }
    }

};

const aiMove = (board, ai) => {
    let {moves} = ai;
    let {grid} = board;
    let lastShipDestroyed, lastMove, lastSpace;
    ai.movesQueueEncoded = {};
    ai.movesQueueEncoded['forwards'] = stc(ai.movesQueue['forwards']);
    ai.movesQueueEncoded['backwards'] = stc(ai.movesQueue['backwards']);
    
    lastMove = ai.attackDir ? ai.movesQueue[ai.attackDir][ai.attackDist] : stc(ai.moves)[stc(ai.moves).length-1];
    if (!lastMove) {
        let move = getUnattackedRandomMove(grid);
        if (!ai.moves) {
            ai.moves += move;
        } else {
            ai.moves = ai.moves + ',' + move;
        }
        return move;        
    } 
    lastSpace = getSpace(grid, lastMove);
    lastShipDestroyed = isLastShipDestroyed(board, lastSpace, ai);


    if (ai.mode === 'random' && lastSpace.ship !== 'blank') {
        ai.mode = 'ho';
        ai.pivots.push(lastMove);
        ai.movesQueueEncoded = getMovesQueue(lastMove);
    }

    if (lastShipDestroyed) ai.mode = 'random';

    if (ai.mode === 'random') {
        let move = getUnattackedRandomMove(grid);
        if (!ai.moves) {
            ai.moves += move;
        } else {
            ai.moves = ai.moves + ',' + move;
        }
        return move;
    } else {
        assessMovesQueue(grid, ai);
        let move = ai.movesQueueEncoded[ai.attackDir][ai.attackDist];
        move = move.slice(0); 
        ai.movesQueue['forwards'] = cts(ai.movesQueueEncoded['forwards']);
        ai.movesQueue['backwards'] = cts(ai.movesQueueEncoded['backwards']);

        if (!ai.moves) {
            ai.moves += move;
        } else {
            ai.moves = ai.moves + ',' + move;
        }       
        return move;
    }
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
    let move, winner, boardIdx, board;

    if (!Array.isArray(req.body)) {
        boardIdx = 0;
        board = game.boards[boardIdx];        
        move = getUnattackedRandomMove(board.grid);
    } else {
        boardIdx = 1;
        move = req.body;        
    }
    board = game.boards[boardIdx];

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

    user.games[user.games.length-1].boards[game.turn].markModified('grid');
    // user.games[user.games.length-1].ai.markModified('forwards');
    // user.games[user.games.length-1].ai.movesQueue.markModified('backwards');
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