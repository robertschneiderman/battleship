import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let spaces = [];
for (let i = 1; i <= 10; i++) {
    spaces.push([]);
    for (let j = 1; j <= 10; j++) {
        let row = spaces[spaces.length-1];
        row.push({boat: 'blank', attacked: false});
    }
}

spaces[0][1] = {boat: 'destroyer', attacked: false};
spaces[0][2] = {boat: 'destroyer', attacked: false};

let defaultState = {
    boards: [{spaces, boats: []}],
    spaces: []
};

const GameReducer = (state = defaultState, action) => {
    let newState;
    switch (action.type) {
        case 'GET_GAME_DATA':
            return newState;
        case 'HIT_SPACE':
            debugger;
            newState = merge({}, state);
            newState.boards[0].spaces[action.payload[0]][action.payload[1]].attacked = true;
            return newState;
        case 'RECEIVE_SPACE':

        default:
            return state;
    }
};

export default GameReducer;