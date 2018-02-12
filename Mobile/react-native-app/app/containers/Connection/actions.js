import * as Constants from './constants';

export const requestLogin = (serverUrl, username, password) => ({
  type: Constants.requestLogin,
  serverUrl,
  username,
  password
});

export const receiveLogin = (token) => ({
  type: Constants.receiveLogin,
  token
});

export const errorLogin = (error) => ({
  type: Constants.errorLogin,
  error
});

export const requestRegister = (serverUrl, username, password, publicIp, port) => ({
  type: Constants.requestRegister,
  serverUrl,
  username,
  password,
  publicIp,
  port
});

export const receiveRegister = (token) => ({
  type: Constants.receiveRegister,
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
