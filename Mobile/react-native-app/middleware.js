import { applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import * as serverSelectionLogic from './app/containers/ServerSelection/logic';

const logicMiddleware = createLogicMiddleware([
  serverSelectionLogic.requestTestServerConnection
]);

const middleware = applyMiddleware(
  logicMiddleware
);

export default middleware;
