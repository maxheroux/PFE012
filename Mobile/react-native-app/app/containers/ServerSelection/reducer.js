import * as Constants from './constants';

const initialState = {
  isFetching: false,
  serverUrl: 'http://{ipconfig -all}:8080/',
  name: 'Bob',
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
        serverUrl: action.serverUrl,
        name: action.name,
        error: undefined
      };
    case Constants.receiveTestServerConnection:
      return {
        ...state,
        isFetching: false,
        id: action.id,
        content: action.content,
        error: undefined
      };
    case Constants.errorTestServerConnection:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        id: -1,
        content: undefined,
      };
    default:
      return state;
  }
}
