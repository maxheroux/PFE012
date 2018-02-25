import { applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import * as connectionLogic from './app/containers/Connection/logic';
import * as navigationLogic from './app/containers/Navigation/logic';
import * as thermostatLogic from './app/containers/Thermostats/logic';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const logicMiddleware = createLogicMiddleware([
  connectionLogic.requestLogin,
  connectionLogic.requestRegister,
  navigationLogic.login,
  thermostatLogic.requestThermostatsList,
  thermostatLogic.requestCreateThermostat
]);

const middleware = applyMiddleware(
  logicMiddleware,
  navigationMiddleware
);

export default middleware;
export const addListener = createReduxBoundAddListener("root");
