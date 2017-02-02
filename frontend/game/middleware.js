import * as API from './api_util';
import * as boardActions from '../board/actions';
import * as gameActions from './actions';
import {router, hashHistory} from 'react-router';

const gamMiddleware = ({dispatch}) => next => action => {

    const successHit = res => {
        debugger;
        dispatch(gameActions.receiveTurn(res.data.game.turn));
        dispatch(boardActions.receiveBoard(res.data.board));
        dispatch(gameActions.receiveMessage(res.data.message));

        if (res.data.game.turn === 1) {
            dispatch(gameActions.getAiMove(res.data.game));
        }
    };

    switch (action.type) {
        case 'HIT_SPACE':
            API.attackBoard(action.payload, successHit);
            return next(action);
        case 'AI_MOVE':
            // newState.game.turn = (newState.game.turn + 1) % 2;
            return newState;            
        default:
            return next(action);
    }
};

export default gamMiddleware;