import { combineReducers } from 'redux';

import connection from './app/containers/Connection/reducer';
import navigation from './app/containers/Navigation/reducer';

const rootReducer = combineReducers({
  connection,
  navigation
});

export default rootReducer;
