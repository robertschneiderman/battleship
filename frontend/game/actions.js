import axios from 'axios';
import store from '../store';
// export const hitSpace = payload => ({
//     type: 'HIT_SPACE',
//     payload
// });

export const receiveGames = payload => ({
    type: 'RECEIVE_GAMES',
    payload
});

export const aiMove = payload => {
    return (dispatch) => {
        // axios.post()
        dispatch({type: 'AI_MOVE', payload});
        dispatch({type: 'COMPUTER_MODE', payload});
    };
};

export const hitSpace = payload => {
    return (dispatch) => {
        // axios.post()
        dispatch({type: 'HIT_SPACE', payload});
        // dispatch({type: 'HIT_SPACE', payload});
        // dispatch({type: 'COMPUTER_MOVE', payload});
    };
};

export const switchTurn = () => ({
    type: 'SWITCH_TURN'
});