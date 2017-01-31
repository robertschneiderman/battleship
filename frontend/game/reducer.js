import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {
    boards: [],
    spaces: []
};

const GameReducer = (state = defaultState, action) => {
    let newState;
    switch (action.type) {
        case 'GET_GAME_DATA':
            return newState;
        default:
            return state;
    }
};

export default GameReducer;