import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils, StorageUtils } from '../../../utils';

export const requestLogin = createLogic({
  type: Constants.requestLogin,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const url = AjaxUtils.createUrl('connection', {
      username: action.username,
      password: action.password,
    });
    AjaxUtils.timeout(5000, fetch(url))
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        AjaxUtils.detectAndThrowServerError(data);
        if (data.value == 'BAD_AUTHENTICATION') {
          dispatch(Actions.errorLogin('Les informations sont invalides.'));
        } else {
          StorageUtils.saveConnectedUser({
            username: action.username,
            token: data.value
          }).catch((error) => console.warn(`Error saving user info. ${JSON.stringify(error)}`));
          dispatch(Actions.successfulLogin(action.username, data.value));
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
    const url = AjaxUtils.createUrl('register', {
      username: action.username,
      password: action.password,
      publicIp: action.publicIp,
      port: action.port,
    });
    AjaxUtils.timeout(5000, fetch(url))
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        AjaxUtils.detectAndThrowServerError(data);
        if (data.value == 'BAD_AUTHENTICATION') {
          dispatch(Actions.errorLogin('Les informations sont invalides.'));
        } else {
          StorageUtils.saveConnectedUser({
            username: action.username,
            token: data.value
          }).catch((error) => console.warn(`Error saving user info. ${JSON.stringify(error)}`));
          dispatch(Actions.successfulRegister(action.username, data.value));
        }
      })
      .catch(() => {
        dispatch(Actions.errorLogin('Une erreur est survenu lors de la connection avec le server.'));
      })
      .then(() => done());
  }
});
