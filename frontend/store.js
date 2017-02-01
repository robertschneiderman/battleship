import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './root_reducer.js';

import gameMiddleware from './game/middleware';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger, gameMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
export default store;