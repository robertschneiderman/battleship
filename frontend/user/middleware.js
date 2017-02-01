import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';
// import { arrayOf, normalize, Schema } from 'normalizr';


const userMiddleware = store => next => action => {

  let dispatch = store.dispatch;

  const getSuccess = res => {
      
    actions.receiveUser(res.data);
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