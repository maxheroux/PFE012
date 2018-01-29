import { combineReducers } from 'redux';

import serverSelectionReducer from './app/containers/ServerSelection/reducer';

const rootReducer = combineReducers({
  serverSelectionReducer
});

export default rootReducer;
