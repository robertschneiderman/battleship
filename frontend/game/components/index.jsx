import React, {Component} from 'react';
import {connect} from 'react-redux';
import Board from './board';
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
            move = (nextSpace.boat !== 'blank') ? nextSpace : (previousSpace.boat !== 'blank') ? previousSpace : getRandCoords();
        } else {
            let randCoords = getRandCoords();
            while (board[randCoords[0]][randCoords[1]].boat !== 'blank') {
                randCoords = getRandCoords();    
            }
            move = randCoords;
        }

        this.props.aiMove(move);
    }

    render() {
        let {boards, hitSpace} = this.props;
        if (this.props.game.turn === 1) this.formulateMove(boards[0]);
                // <Board owner={'user'} board={boards[0]} />
                // <Board owner={'computer'} board={boards[1]} />
        return(
            <div className="game">
                <Board owner={'user'} {...this.props} board={boards[0]} />
                <Board owner={'opponent'} {...this.props} board={boards[1]} />
            </div>
        );
    }
}

// const populateBoard = () => {
//     spaces.forEach();
// };


const mapStateToProps = state => {
    // attacked
    // unattacked

    // empty
    // boat-names ...

    // miss
    // hit    

    let {game} = state;
        // ai: users[1]

    return {
        game: game.game,
        boards: game.boards,
    };
};

    // Board: payload => dispatch(Board(payload))
const mapDispatchToProps = dispatch => ({
    hitSpace: (payload) => dispatch(actions.hitSpace(payload)),
    switchTurn: (payload) => dispatch(actions.switchTurn(payload)),
    aiMove: (payload) => dispatch(actions.aiMove(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);