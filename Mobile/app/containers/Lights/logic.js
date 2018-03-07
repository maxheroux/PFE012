import { createLogic } from 'redux-logic';
import tinycolor from 'tinycolor2';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils, StorageUtils } from '../../../utils';

export const requestLightsList = createLogic({
  type: Constants.requestLightsList,
  latest: true,
  process({ getState, action }, dispatch, done) {
    // TODO: remove after testing
    const newLights = [];
    for(let i = 0; i < 5; i++){
      newLights.push({
        id: i,
        name: `Lumière #${i}`,
        color: tinycolor({
          r: 123 + (Math.random() * 123),
          g: 123 + (Math.random() * 123),
          b: 123 + (Math.random() * 123)
        }).saturate(50).toHex(),
        brightness: 0.4 + (i / 10),
      });
    }
    dispatch(Actions.receiveLightsList(newLights));
    // end test
    const request = AjaxUtils.createPostRequest('state/request', {// TODO: find url
      username: getState().connection.username,
      token: getState().connection.token,
      peripheralId: 1
    });
    AjaxUtils.performRequest(request, (data) => {
        let list = newLights;// TODO: Retrieve from server
        dispatch(Actions.receiveLightsList(list));
    }, Actions.errorLightsList, dispatch, done);
  }
});

export const requestModifyLight = createLogic({
  type: Constants.requestModifyLight,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const request = AjaxUtils.createPostRequest('device/modify', {// TODO: find url
      username: getState().connection.username,
      token: getState().connection.token,
      ids: action.ids,
      targetTemp: action.targetTemp,
      type: 'thermostat'
    });
    AjaxUtils.performRequest(request, (data) => {
      dispatch(Actions.successfulModifyLight(data.value));
    }, Actions.errorModifyLight, dispatch, done);
  }
});

export const requestCreateLight = createLogic({
  type: Constants.requestCreateLight,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const request = AjaxUtils.createPostRequest('device/create', {// TODO: find url
      username: getState().connection.username,
      token: getState().connection.token,
      name: action.name,
      bluetoothAddress: action.bluetoothAddress,
      type: 'light'
    });
    AjaxUtils.performRequest(request, (data) => {
      dispatch(Actions.successfulCreateLight(data.value));
    }, Actions.errorCreateLight, dispatch, done);
  }
});
