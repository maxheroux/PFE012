import * as Constants from './constants';

const initialState = {
  isFetching: false,
  serverUrl: 'http://127.0.0.1:8080/',
  error: undefined,
  id: -1,
  content: undefined,
};

export default function serverSelectionReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.requestTestServerConnection:
      return {
        ...state,
        isFetching: true,
        serverUrl: action.serverUrl
      }
    case Constants.receiveTestServerConnection:
      return {
        ...state,
        isFetching: false,
        id: action.id,
        content: action.content,
        error: undefined
      }
    case Constants.requestTestServerConnection:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}
