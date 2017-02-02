import React, {Component} from 'react';
import {connect} from 'react-redux';
import Board from '../../board/components';
import merge from 'lodash/merge';
import * as actions from '../actions';
import store from '../../store';
import GameModal from './game_modal';


const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandCoords = () => {
    return [getRandomNumber(0, 9), getRandomNumber(0, 9)];
};

class Game extends Component {
    constructor(props) {
        super(props);
        this.renderModal = this.renderModal.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const currentUser = localStorage.getItem('currentUser');
        if (token) {
            store.dispatch({ type: 'AUTH_USER' });
        }
        if (currentUser) {
            store.dispatch({ type: 'REQUEST_USER', payload: currentUser });
        }        
        if (this.props.game.turn === 1) {
            this.props.getAiMove();
        }
    }

    handleTemp() {
        this.props.receiveTurn(0);
    }

    renderModal() {
        let { status, winner } = this.props;
        if (status === 'over') {
            return (
                <GameModal {...this.props} className="game-modal" />
            );
        }
    }

    render() {
        let {game, turn, boards, hitSpace, message, status} = this.props;
        if (boards.length !== 0) {
            return(
                <div className="game">
                    {this.renderModal()}
                    <p className="message">{message}</p>
                    <button style={{position: 'absolute', top: '10px', width: '50px'}} onClick={this.handleTemp.bind(this)}>reset turn</button>
                    <Board owner={'user'} {...this.props} board={boards[0]} />
                    <Board owner={'opponent'} {...this.props} board={boards[1]} />
                </div>
            );
        } 
        else {
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
        boards = currentGame.boards.map(boardId => board[boardId]);
    } else {
        currentGame = {turn: 0};
    }

    return {
        user,
        game: games,
        turn: currentGame.turn, 
        message: currentGame.message, 
        status: currentGame.status, 
        winner: currentGame.winner, 
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
    getAiMove: () => dispatch(actions.getAiMove()),
    newGame: () => dispatch(actions.newGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);