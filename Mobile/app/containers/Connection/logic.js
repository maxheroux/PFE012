import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { timeout, createUrl, detectAndThrowServerError } from '../../../utils';

export const requestLogin = createLogic({
  type: Constants.requestLogin,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const url = createUrl('connection', {
      username: action.username,
      password: action.password,
    });
    timeout(5000, fetch(url))
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        detectAndThrowServerError(data);
        if (data.value == 'BAD_AUTHENTICATION') {
          dispatch(Actions.errorLogin('Les informations sont invalides.'));
        } else {
          dispatch(Actions.successfulLogin(data.value));
        }
      })
      .catch(() => {
        dispatch(Actions.errorLogin('Une erreur est survenu lors de la connection avec le server.'));
      })
      .then(() => done());
  }
});

export const requestRegister = createLogic({
  type: Constants.requestRegister,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const url = createUrl('register', {
      username: action.username,
      password: action.password,
      publicIp: action.publicIp,
      port: action.port,
    });
    timeout(5000, fetch(url))
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        detectAndThrowServerError(data);
        if (data.value == 'BAD_AUTHENTICATION') {
          dispatch(Actions.errorLogin('Les informations sont invalides.'));
        } else {
          dispatch(Actions.successfulRegister(data.value));
        }
      })
      .catch(() => {
        dispatch(Actions.errorLogin('Une erreur est survenu lors de la connection avec le server.'));
      })
      .then(() => done());
  }
});
