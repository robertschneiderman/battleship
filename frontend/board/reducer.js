import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = [];

const boardReducer = (state = defaultState, action) => {
    let newState;
    switch (action.type) {
        case 'RECEIVE_BOARDS':
            return action.payload;
        default:
            return state;
    }
};

export default boardReducer;