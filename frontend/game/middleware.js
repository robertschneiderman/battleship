import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';

const gamMiddleware = ({dispatch}) => next => action => {

    const success = res => {
        dispatch(actions.receiveBoards(res.data));
        dispatch(actions.receiveTurn(res.data));
        // dispatch(actions.receiveTurn(res.data));
    };

    switch (action.type) {
        case 'HIT_SPACE':
            API.attackBoard(action.payload, success);
            return next(action);
        default:
            return next(action);
    }
};

export default gamMiddleware;