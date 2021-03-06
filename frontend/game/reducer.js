import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

// let boats = [
//     {
//         name: 'Aircraft Carrier', 
//         capacity: 5,
//         hits: 0,
//         coordinates: [],
//         vertical: false
//     }, {
//         name: 'Battleship', 
//         capacity: 4,
//         hits: 0,
//         coordinates: [],
//         vertical: false
//     },{
//         name: 'Submarine', 
//         capacity: 3,
//         hits: 0,
//         coordinates: [],
//         vertical: false
//     }, {
//         name: 'Destroyer', 
//         capacity: 3,
//         hits: 0,
//         coordinates: [],
//         vertical: false
//     },{
//         name: 'Patrol Boat', 
//         capacity: 2,
//         hits: 0,
//         coordinates: [],
//         vertical: false
//     }           
// ];

// const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const findOrigin = boat => {
//     let limit = 9 - boat.capacity + 1;
//     let limitedDim = getRandomNumber(0, limit);
//     let regularDim = getRandomNumber(0, 9);
//     return (boat.vertical) ? [limitedDim, regularDim] : [regularDim, limitedDim];
// };

// const randomAssignment = boats => {
//     boats.forEach(boat => {
//         boat.vertical = !!getRandomNumber(0, 1);
//         let origin = findOrigin(boat);
//         let dimIdx = (boat.vertical) ? 0 : 1;
//         for (let i = 0; i < boat.capacity; i++) {
//             let newOrigin = [origin[0], origin[1]];
//             newOrigin[dimIdx] += i;
//             boat.coordinates.push(newOrigin);
//         }
//     });
// };

// randomAssignment(boats);

// let spaces = [];
// for (let i = 1; i <= 10; i++) {
//     spaces.push([]);
//     for (let j = 1; j <= 10; j++) {
//         let row = spaces[spaces.length-1];
//         row.push({boat: 'blank', attacked: false});
//     }
// }


// let spaces2 = [];
// for (let i = 1; i <= 10; i++) {
//     spaces2.push([]);
//     for (let j = 1; j <= 10; j++) {
//         let row = spaces2[spaces2.length-1];
//         row.push({boat: 'blank', attacked: false});
//     }
// }
// // debugger;

// boats.forEach(boat => {
//     boat.coordinates.forEach(coord => {
//         spaces[coord[0]][coord[1]].boat = boat.name;
//     });
// });



let defaultState = {};

const objToArr = obj => {
    let arr = [];
    for (let key in obj) arr.push(obj[key]);
    return arr;
};

const GameReducer = (state = defaultState, action) => {
    let newState = merge({}, state);
    let games = objToArr(newState);
    let currentGame = games[games.length-1];
    switch (action.type) {
        case 'GET_GAME_DATA':
            return newState;
        case 'AI_MOVE':
            // coords, h/m
            // newState.boards[0].spaces[action.payload[0]][action.payload[1]].attacked = true;
            // newState.game.turn = (newState.game.turn + 1) % 2;
            return newState;
        case 'RECEIVE_GAMES':
            return action.payload;

        case 'RECEIVE_GAME':
            debugger;
            newState[action.payload._id] = action.payload;
            return newState;
        case 'RECEIVE_GAME_STATUS':
            newState[currentGame._id].status = action.payload;        
            return newState;
        case 'RECEIVE_WINNER':
            newState[currentGame._id].winner = action.payload;        
            return newState;            
        // case 'RECEIVE_GAME':
        //     return action.payload;
        case 'RECEIVE_TURN':
            newState[currentGame._id].turn = action.payload;
            return newState; 
        case 'RECEIVE_MESSAGE':
            newState[currentGame._id].message = action.payload;
            return newState;                                   
        case 'RECEIVE_AI':
        
        case 'SWITCH_TURN':
            // newState.game.turn = (newState.game.turn + 1) % 2;
            return newState;
        default:
            return state;
    }
};

export default GameReducer;