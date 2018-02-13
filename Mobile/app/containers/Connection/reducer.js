import * as Constants from './constants';

const initialState = {
  isFetching: false,
  serverUrl: 'http://192.168.2.100:8080/',
  error: undefined,
  username: '',
  token: undefined,
  displayedScreen: Constants.screens.login
};

export default function connectionReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.requestLogin:
    case Constants.requestRegister:
      return {
        ...state,
        isFetching: true,
        serverUrl: action.serverUrl,
        username: action.username,
        error: undefined
      };
    case Constants.receiveLogin:
    case Constants.receiveRegister:
      return {
        ...state,
        isFetching: false,
        token: action.token,
        error: undefined
      };
    case Constants.errorLogin:
    case Constants.errorRegister:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        token: undefined,
      };
    case Constants.gotToLogin:
      return {
        ...state,
        displayedScreen: Constants.screens.login
      };
    case Constants.goToRegister:
      return {
        ...state,
        displayedScreen: Constants.screens.register
      };
    default:
      return state;
  }
}
