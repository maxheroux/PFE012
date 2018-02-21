import * as Constants from './constants';

export const requestLogin = (username, password) => ({
  type: Constants.requestLogin,
  username,
  password
});

export const successfulLogin = (token) => ({
  type: Constants.successfulLogin,
  token
});

export const errorLogin = (error) => ({
  type: Constants.errorLogin,
  error
});

export const requestRegister = (username, password, publicIp, port) => ({
  type: Constants.requestRegister,
  username,
  password,
  publicIp,
  port
});

export const successfulRegister = (token) => ({
  type: Constants.successfulRegister,
  token
});

export const errorRegister = (error) => ({
  type: Constants.errorRegister,
  error
});

export const gotToLogin = () => ({
  type: Constants.gotToLogin
});

export const goToRegister = () => ({
  type: Constants.goToRegister
});
