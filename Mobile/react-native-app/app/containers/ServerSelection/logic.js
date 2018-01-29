import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';

export const requestTestServerConnection = createLogic({
  type: Constants.requestTestServerConnection,
  latest: true,
  process({ getState, action }, dispatch, done) {
    fetch(action.serverUrl + 'connection?name=' + action.name)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(Actions.receiveTestServerConnection(data.id, data.content));
      })
      .catch((error) => {
        dispatch(Actions.errorTestServerConnection(error));
      })
      .then(() => done());
  }
});
