import axios from 'axios';

export const hitSpace = payload => ({
    type: 'HIT_SPACE',
    payload
});

export const hitSpace = payload => {
    return (dispatch) => {
        // axios.post()
        dispatch({type: 'HIT_SPACE', payload});
        // dispatch({type: 'COMPUTER_MOVE', payload});
    };
};

export const switchTurn = () => ({
    type: 'SWITCH_TURN'
});