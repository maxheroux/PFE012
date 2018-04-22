import { createLogic } from 'redux-logic';
import tinycolor from 'tinycolor2';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { PeripheralLogicHelper, peripheralType } from '../../helpers/Peripheral/logic';
import { map } from 'lodash';

export const requestLightsList = createLogic({
  type: Constants.requestLightsList,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.light,
      Actions.errorLightsList,
      getState(),
      dispatch
    );
    logicHelper.fetchPeripherals()
      .then((items) => {
        const formattedList = map(items, i => {
          const color = tinycolor(i.color).toHex();
          return {
            id: i.id,
            name: i.name,
            color: color,
            brightness: i.brightness,
          };
        });
        dispatch(Actions.receiveLightsList(formattedList));
      })
      .catch((error) => {

      })
      .then(() => done());
  }
});

export const requestModifyLight = createLogic({
  type: Constants.requestModifyLight,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.light,
      Actions.errorModifyLight,
      getState(),
      dispatch
    );
    const value = {
      color: String(action.color),
      brightness: String(action.brightness),
    };
    const itemSuccessFn = (data) => {
      dispatch(Actions.successfulModifyLight(data.value));
    }
    logicHelper.modifyPeripherals(
      action.ids,
      value,
      itemSuccessFn)
      .catch()
      .then(() => done());
  }
});

export const requestCreateLight = createLogic({
  type: Constants.requestCreateLight,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.light,
      Actions.errorCreateLight,
      getState(),
      dispatch
    );
    logicHelper.createPeripheral(action.name, action.bluetoothAddress)
    .then((data) => {
      dispatch(Actions.successfulCreateLight(data.value));
    })
    .catch()
    .then(() => done());
  }
});

export const startLightsListFetchInterval = createLogic({
  type: Constants.startLightsListFetchInterval,
  latest: true,
  transform({ getState, action, dispatch }, next) {
    let interval = getState().lights.list.interval;
    if (!interval) {
      interval = setInterval(() => {
        dispatch(Actions.requestLightsList());
      }, 2000);
    }
    next({
      ...action,
      interval
    });
  }
});
