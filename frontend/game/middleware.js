import * as API from './api_util';
import * as boardActions from '../board/actions';
import * as gameActions from './actions';
import {router, hashHistory} from 'react-router';

const gamMiddleware = ({dispatch}) => next => action => {

    const successHit = res => {
        debugger;
        dispatch(boardActions.receiveBoard(res.data.board));
        // dispatch(gameActions.receiveTurn(res.data));
        // dispatch(actions.receiveTurn(res.data));
    };

    switch (action.type) {
        case 'HIT_SPACE':
            API.attackBoard(action.payload, successHit);
            return next(action);
        default:
            return next(action);
    }
};

export default gamMiddleware;