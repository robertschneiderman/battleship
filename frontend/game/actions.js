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

export const receiveGame = payload => ({
    type: 'RECEIVE_GAME',
    payload
});

export const receiveTurn = payload => ({
    type: 'RECEIVE_TURN',
    payload
});

export const receiveMessage = payload => ({
    type: 'RECEIVE_MESSAGE',
    payload
});


export const getAiMove = payload => {
    return (dispatch) => {
        // axios.post()
        setTimeout(() => {
        // Yay! Can invoke sync or async actions with `dispatch`
            dispatch({type: 'HIT_SPACE', payload});
        }, 2000);        
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