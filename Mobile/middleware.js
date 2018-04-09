import { applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import * as connectionLogic from './app/containers/Connection/logic';
import * as navigationLogic from './app/containers/Navigation/logic';
import * as thermostatLogic from './app/containers/Thermostats/logic';
import * as lightLogic from './app/containers/Lights/logic';
import * as lockLogic from './app/containers/Locks/logic';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

export const logicMiddleware = createLogicMiddleware([
  connectionLogic.requestLogin,
  connectionLogic.requestRegister,
  navigationLogic.login,
  thermostatLogic.requestThermostatsList,
  thermostatLogic.requestCreateThermostat,
  thermostatLogic.requestModifyThermostat,
  thermostatLogic.startThermostatsListFetchInterval,
  lightLogic.requestLightsList,
  lightLogic.requestCreateLight,
  lightLogic.requestModifyLight,
  lockLogic.requestLocksList,
  lockLogic.requestCreateLock,
  lockLogic.requestModifyLock,
]);

const middleware = applyMiddleware(
  logicMiddleware,
  navigationMiddleware
);

export default middleware;
export const addListener = createReduxBoundAddListener("root");
