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

    componentDidMount() {
        this.props.getAiMove();
    }

    formulateMove(board) {
        // let { game } = this.props;
        // let mode;
        // // let mode = 'attackHorizontal';
        // let moves = [[3, 4]];
        // let move;
        // if (mode !== 'random') {
        //     let lastMove = moves[moves.length-1];
        //     let nextSpace;
        //     let previousSpace;
        //     // let coordIdx = (mode === 'attackHorizontal') ? 1 : 0;
        //     nextSpace = [3, lastMove[1] + 1];   
        //     previousSpace = [3, lastMove[1] - 1];
        //     move = (nextSpace.ship !== 'blank') ? nextSpace : (previousSpace.ship !== 'blank') ? previousSpace : getRandCoords();
        // } else {
        //     let randCoords = getRandCoords();
        //     while (board[randCoords[0]][randCoords[1]].ship !== 'blank') {
        //         randCoords = getRandCoords();    
        //     }
        //     move = randCoords;
        // }

        this.props.hitSpace();
    }

    handleTemp() {
        this.props.receiveTurn(0);
    }

    render() {
        let {game, turn, boards, hitSpace, message} = this.props;
        if (boards.length !== 0) {
            return(
                <div className="game">

                    <p className="message">{message}</p>
                    <button style={{position: 'absolute', top: '10px', width: '50px'}} onClick={this.handleTemp.bind(this)}>reset turn</button>
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

            debugger;


    return {
        user,
        game: games,
        turn: currentGame.turn, 
        message: currentGame.message, 
        boards: boards,
        ships: ship
    };
};

    // Board: payload => dispatch(Board(payload))
const mapDispatchToProps = dispatch => ({
    hitSpace: (payload) => dispatch(actions.hitSpace(payload)),
    switchTurn: (payload) => dispatch(actions.switchTurn(payload)),
    aiMove: (payload) => dispatch(actions.aiMove(payload)),
    receiveTurn: (payload) => dispatch(actions.receiveTurn(payload)),
    getAiMove: () => dispatch(actions.getAiMove())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);