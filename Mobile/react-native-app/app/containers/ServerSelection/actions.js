import * as Constants from './constants';

export const requestTestServerConnection = (serverUrl, name) => ({
  type: Constants.requestTestServerConnection,
  serverUrl,
  name
});

export const receiveTestServerConnection = (id, content) => ({
  type: Constants.receiveTestServerConnection,
  id,
  content
});

export const errorTestServerConnection = (error) => ({
  type: Constants.receiveTestServerConnection,
  error
});
