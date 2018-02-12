import { applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import * as connectionLogic from './app/containers/Connection/logic';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const logicMiddleware = createLogicMiddleware([
  connectionLogic.requestLogin,
  connectionLogic.requestRegister,

]);

const middleware = applyMiddleware(
  logicMiddleware,
  navigationMiddleware
);

export default middleware;
export const addListener = createReduxBoundAddListener("root");
