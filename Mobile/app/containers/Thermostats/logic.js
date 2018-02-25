import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils, StorageUtils } from '../../../utils';

export const requestThermostatsList = createLogic({
  type: Constants.requestThermostatsList,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const request = AjaxUtils.createPostRequest('device/list', {// TODO: find url
      username: getState().connection.username,
      token: getState().connection.token,
      type: 'thermostat'
    });
    AjaxUtils.timeout(5000, request())
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        AjaxUtils.detectAndThrowServerError(data);
        if (data.value == 'BAD_AUTHENTICATION') {
          dispatch(Actions.errorThermostatsList('Les informations sont invalides.'));
        } else {
          dispatch(Actions.receiveThermostatsList(data.value));
        }
      })
      .catch(() => {
        dispatch(Actions.errorThermostatsList('Une erreur est survenu lors de la connection avec le server.'));
      })
      .then(() => done());
  }
});

export const requestCreateThermostat = createLogic({
  type: Constants.requestCreateThermostat,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const request = AjaxUtils.createPostRequest('device/create', {// TODO: find url
      username: getState().connection.username,
      token: getState().connection.token,
      name: action.name,
      bluetoothAddress: action.bluetoothAddress,
      type: 'thermostat'
    });
    AjaxUtils.timeout(5000, request())
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        AjaxUtils.detectAndThrowServerError(data);
        if (data.value == 'BAD_AUTHENTICATION') {
          dispatch(Actions.errorCreateThermostat('Les informations sont invalides.'));
        } else {
          dispatch(Actions.successfulCreateThermostat(data.value));
        }
      })
      .catch(() => {
        dispatch(Actions.errorCreateThermostat('Une erreur est survenu lors de la connection avec le server.'));
      })
      .then(() => done());
  }
});
