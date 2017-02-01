import * as API from './api_util';
import { receiveUsers } from './actions';
import { receiveGames } from '../game/actions';
import { receiveBoards } from '../board/actions';
// import { receiveBoards } from '../board/actions';
// import { receiveShips } from '../ship/actions';
import {router, hashHistory} from 'react-router';
import { normalize, schema } from 'normalizr';

const shipSchema = new schema.Entity('ships', {}, {idAttribute: '_id'});
const boardSchema = new schema.Entity('boards', { ships: [shipSchema] }, {idAttribute: '_id'});
const gameSchema = new schema.Entity('games', { boards: [boardSchema] }, {idAttribute: '_id'});
const userSchema = new schema.Entity('users', { games: [gameSchema] }, {idAttribute: '_id'});

// userSchema.define({
//   games: [gameSchema],
// });

// gameSchema.define({
//   boards: [boardSchema],
// });

// boardSchema.define({
//     ships: [shipSchema],
// });

const userMiddleware = store => next => action => {

  let dispatch = store.dispatch;

  const getSuccess = res => {
    // debugger;
    const normalized = normalize(res.data.users, [userSchema]);
    // debugger;
      // games: arrayOf(gameSchema),
      // boards: arrayOf(boardSchema),
      // ships: arrayOf(shipSchema),
      
    let { users, games, boards, ships } = normalized.entities;
      // debugger;
    dispatch(receiveBoards(boards));
    dispatch(receiveGames(games));
    dispatch(receiveUsers(users));
    // receiveBoards(boards);
    // receiveShips(ships);
  }; 

  switch (action.type) {

    case "REQUEST_USER":
      API.getUser(action.payload, getSuccess);
      return next(action);      
    default:
      return next(action);
  }
};   

export default userMiddleware;