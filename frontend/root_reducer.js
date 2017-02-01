import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth/reducer';
import user from './user/reducer';
import game from './game/reducer';
import board from './board/reducer';
import ship from './ship/reducer';


const appReducer = combineReducers({
  auth,
  board,
  game,
  form,
  ship,
  user
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;