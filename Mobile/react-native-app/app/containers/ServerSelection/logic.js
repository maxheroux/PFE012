import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';

export const requestTestServerConnection = createLogic({
  type: Constants.requestTestServerConnection,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const url = action.serverUrl + 'connection?name=' + action.name;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(Actions.receiveTestServerConnection(data.id, data.content));
      })
      .catch((error) => {
        dispatch(Actions.errorTestServerConnection(JSON.stringify(error)));
      })
      .then(() => done());
  }
});
