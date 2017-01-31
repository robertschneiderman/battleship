import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth/reducer';
import game from './game/reducer';


const appReducer = combineReducers({
  auth,
  game,
  form
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;