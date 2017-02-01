import React, {Component} from 'react';
import {connect} from 'react-redux';
import Board from '../../board/components';
import merge from 'lodash/merge';
import * as actions from '../actions';

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandCoords = () => {
    return [getRandomNumber(0, 9), getRandomNumber(0, 9)];
};

class Game extends Component {
    constructor(props) {
        super(props);
        this.formulateMove = this.formulateMove.bind(this);
    }

    formulateMove(board) {
        let { game } = this.props;
        let mode;
        // let mode = 'attackHorizontal';
        let moves = [[3, 4]];
        let move;
        if (mode !== 'random') {
            let lastMove = moves[moves.length-1];
            let nextSpace;
            let previousSpace;
            // let coordIdx = (mode === 'attackHorizontal') ? 1 : 0;
            nextSpace = [3, lastMove[1] + 1];   
            previousSpace = [3, lastMove[1] - 1];
            move = (nextSpace.ship !== 'blank') ? nextSpace : (previousSpace.ship !== 'blank') ? previousSpace : getRandCoords();
        } else {
            let randCoords = getRandCoords();
            while (board[randCoords[0]][randCoords[1]].ship !== 'blank') {
                randCoords = getRandCoords();    
            }
            move = randCoords;
        }

        this.props.aiMove(move);
    }

    render() {
        let {game, boards, hitSpace} = this.props;
        if (game.turn === 1) this.formulateMove(boards[0]);
        if (boards.length !== 0) {
            return(
                <div className="game">
                    <Board owner={'user'} {...this.props} board={boards[0]} />
                    <Board owner={'opponent'} {...this.props} board={boards[1]} />
                </div>
            );
        } else {
            return <div className="game"></div>;
        }
    }
}

// const populateBoard = () => {
//     spaces.forEach();
// };

const objToArr = obj => {
    let arr = [];
    for (let key in obj) arr.push(obj[key]);
    return arr;
};


const mapStateToProps = state => {
    let {user, game, board, ship} = state;

    let games = objToArr(game);
    let boards = objToArr(board);
    let currentGame;

    if (games.length > 0) {
        currentGame = games[games.length-1];
    } else {
        currentGame = {turn: 0};
    }

    return {
        user,
        game: games,
        boards: boards,
        ships: ship
    };
};

    // Board: payload => dispatch(Board(payload))
const mapDispatchToProps = dispatch => ({
    hitSpace: (payload) => dispatch(actions.hitSpace(payload)),
    switchTurn: (payload) => dispatch(actions.switchTurn(payload)),
    aiMove: (payload) => dispatch(actions.aiMove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);