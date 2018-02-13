import { combineReducers } from 'redux';

import connection from './app/containers/Connection/reducer';
import navigation from './app/containers/Navigation/reducer';
import tabsNavigation from './app/containers/TabsNavigation/reducer';

const rootReducer = combineReducers({
  connection,
  navigation,
  tabsNavigation
});

export default rootReducer;
