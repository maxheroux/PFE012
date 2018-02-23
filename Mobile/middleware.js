import { applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import * as connectionLogic from './app/containers/Connection/logic';
import * as navigationLogic from './app/containers/Navigation/logic';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const logicMiddleware = createLogicMiddleware([
  connectionLogic.requestLogin,
  connectionLogic.requestRegister,
  navigationLogic.login
]);

const middleware = applyMiddleware(
  logicMiddleware,
  navigationMiddleware
);

export default middleware;
export const addListener = createReduxBoundAddListener("root");
