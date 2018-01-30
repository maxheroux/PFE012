import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';

const timeout = (ms, promise) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export const requestTestServerConnection = createLogic({
  type: Constants.requestTestServerConnection,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const url = action.serverUrl + 'connection?name=' + action.name;
    timeout(5000, fetch(url))
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        dispatch(Actions.receiveTestServerConnection(data.id, data.content));
      })
      .catch(() => {
        dispatch(Actions.errorTestServerConnection('Une erreur est survenu lors de la connection avec le server.'));
      })
      .then(() => done());
  }
});
