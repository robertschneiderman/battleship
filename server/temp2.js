const getSpace = (board, coord) => {
    return board[coord[0]][coord[1]];
};

const isLastShipDestroyed = (board, lastSpace) => {
    if (lastSpace.ship !== 'blank') {
        for (let i = 0; i < board.ships.length; i++) {
            let ship = board.ships[i];
            if (ship.name === lastSpace.ship && ship.hits === ship.capacity) {
                return ship;
            }
        }
    }
    return false;
};

const removeAttackData = (ai, destroyedShip) => {
    destroyedShip.coordinates.forEach(coord => {
        let i = ai.hits.indexOf(coord);
        let j = ai.pivots.indexOf(coord);
        if( i !== -1) ai.hits.splice(i, 1);
        if( j !== -1) ai.hits.splice(j, 1);
    });
};

const getGoodNextMove = (board, moves) => {
    let nextGoodMove;
    moves.forEach((move, i) => {
        let space = getSpace(board, move);
        if (!space.attacked) {
            nextGoodMove = move;
        } else {
            if (ai.attackDir === 'forward') {
                ai.attackDir = 'backwards';
            } else {
                ai.attackDir = 'forwards';
                ai.attackDist += 1;
            }
        }
    });
    return nextGoodMove;
};

const moveMissedOrAttacked = (board, move) => {

}



const assessNextMoves = (board, ai) => {
    curIdxOfNextMoves = getIt!
    if (curIdxOfNextMoves === 0) {
        if (moveMissedOrAttacked(ai.nextMoves[0]) && moveMissedOrAttacked(ai.nextMoves[1])) {
            abandonHo = true;
            ai.attackDist = 1; 
            ai.nextMoves = getNextMoves(ai.pivot[0], true);
        } else if (!moveMissedOrAttacked(ai.nextMoves[0])) {
            // first space empty
            return; 
        } else {
            ai.attackDir = 'backwards';
            abandonFowards = true;
            return;
        }
    }

    let lastSpace = getSpace(board, ai.nextMoves[curIdxOfNextMoves-1]);


    if (moveMissedOrAttacked(lastSpace)) {
        if (ai.attackDir === 'fowards') {
            ai.abandonForwards = true
        } else {
            ai.abandonBackwards = true;
        }
    }

    if (ai.attackDir === 'backwards' || abandonBackwards || abandonForwards) ai.attackDist += 1;

    if (ai.attackDir === 'forwards' && !abandonBackwards) {
        ai.attackDir = 'backwards'
    }

    if (ai.attackDir === 'backwards' && !abandonForwards) {
        ai.attackDir = 'forwards'
    }    

    if (ai.abandonBackwards && ai.abandonForwards) {
        ai.abandonHo = true;
        ai.abandonBackwards = false;
        ai.abandonForwards = false; 
        ai.attackDir = 'forwards';
        ai.attackDist = 1; 
        ai.nextMoves = getNextMoves(ai.pivot[0], true);               
    }
};

const aiMove = (game, changedMode) => {

    let {ai, boards} = game;
    let {moves} = ai;
    let board = boards[0];

    let lastMove = moves[moves.length-1];
    let lastSpace = getSpace(board, lastMove);

    let lastShipDestroyed = isLastShipDestroyed(board, lastSpace);

    if (lastShipDestroyed) {
        removeAttackData(ai, lastShipDestroyed);
        nextMoves = [];
        if (ai.hits.length > 0) {
            ai.pivots = ai.hits.pop();
            mode = 'ho';
            nextMoves = getNextMoves(pivots[0]);
        } else {
            mode = 'random';
        }
    }

    if (ai.mode === 'random' && lastMove === 'hit' && !lastShipDestroyed) {
        ai.mode = 'ho'
        ai.pivots.push(lastMove);
        ai.nextMoves = getNextMoves(lastMove);
    }

    assessNextMoves();



    return move;
    
};

const temp = arr => {
    arr.forEach(el => {
        if (el === 3) {
            arr.shift();
        } else {
            console.log(el);
        }
    });
};