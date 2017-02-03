import * as API from './api_util';
import * as boardActions from '../board/actions';
import * as gameActions from './actions';
import * as userActions from '../user/actions';
import {router, hashHistory} from 'react-router';

const gamMiddleware = ({dispatch}) => next => action => {

    const successHit = res => {
        dispatch(gameActions.receiveTurn(res.data.game.turn));
        dispatch(boardActions.receiveBoard(res.data.board));
        dispatch(gameActions.receiveGameStatus(res.data.status));
        dispatch(gameActions.receiveMessage(res.data.message));
        if (res.data.winner) {
            dispatch(gameActions.receiveWinner(res.data.winner));
        }
        if (res.data.game.turn === 1 && res.data.status === 'playing') {
            dispatch(gameActions.getAiMove(res.data.game));
        }
    };

    const successNewGame = res => {
        dispatch(userActions.requestUser(localStorage.getItem('currentUser')));        
    };    

    switch (action.type) {
        case 'HIT_SPACE':
            API.attackBoard(action.payload, successHit);
            return next(action);
        case 'NEW_GAME':
            API.newGame(successNewGame);
            return next(action);
        default:
            return next(action);
    }
};

export default gamMiddleware;