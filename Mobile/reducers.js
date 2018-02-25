import { combineReducers } from 'redux';

import connection from './app/containers/Connection/reducer';
import navigation from './app/containers/Navigation/reducer';
import tabsNavigation from './app/containers/TabsNavigation/reducer';
import peripheralList from './app/containers/PeripheralList/reducer';
import thermostats from './app/containers/Thermostats/reducer';

const rootReducer = combineReducers({
  connection,
  navigation,
  tabsNavigation,
  peripheralList,
  thermostats
});

export default rootReducer;
