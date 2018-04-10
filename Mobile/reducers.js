import { combineReducers } from 'redux';

import connection from './app/containers/Connection/reducer';
import navigation from './app/containers/Navigation/reducer';
import tabsNavigation from './app/containers/TabsNavigation/reducer';
import peripheralList from './app/containers/PeripheralList/reducer';
import thermostats from './app/containers/Thermostats/reducer';
import lights from './app/containers/Lights/reducer';
import locks from './app/containers/Locks/reducer';
import otherPeripherals from './app/containers/OtherPeripherals/reducer';
import alerts from './app/containers/Alerts/reducer';

const rootReducer = combineReducers({
  connection,
  navigation,
  tabsNavigation,
  peripheralList,
  thermostats,
  lights,
  locks,
  otherPeripherals,
  alerts
});

export default rootReducer;
