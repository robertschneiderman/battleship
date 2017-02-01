import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = [];

const boardReducer = (state = defaultState, action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'RECEIVE_BOARDS':
            return action.payload;
        case 'RECEIVE_BOARD':
        debugger;
            newState[action.payload.id] = action.payload;
            return newState;            
        default:
            return state;
    }
};

export default boardReducer;