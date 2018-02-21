import * as Constants from './constants';

const initialState = {
  isFetching: false,
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
        username: action.username,
        error: undefined
      };
    case Constants.successfulLogin:
    case Constants.successfulRegister:
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
        displayedScreen: Constants.screens.login,
        error: undefined
      };
    case Constants.goToRegister:
      return {
        ...state,
        displayedScreen: Constants.screens.register,
        error: undefined
      };
    default:
      return state;
  }
}
