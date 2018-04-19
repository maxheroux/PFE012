import { createLogic } from 'redux-logic';
import tinycolor from 'tinycolor2';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { PeripheralLogicHelper, peripheralType } from '../../helpers/Peripheral/logic';
import { map } from 'lodash';

// TODO: remove after testing
const placeholderLights = [];
for(let i = 0; i < 5; i++){
  placeholderLights.push({
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
        if (items.length > 0) {
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
        } else {
          // TODO: remove after testing
          dispatch(Actions.receiveLightsList(placeholderLights));
        }
      })
      .catch((error) => {
        dispatch(Actions.receiveLightsList(placeholderLights))
      })// TODO: remove after testing
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
