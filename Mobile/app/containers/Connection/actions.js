import * as Constants from './constants';

export const requestLogin = (username, password) => ({
  type: Constants.requestLogin,
  username,
  password
});

export const successfulLogin = (username, token) => ({
  type: Constants.successfulLogin,
  username,
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

export const successfulRegister = (username, token) => ({
  type: Constants.successfulRegister,
  username,
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
