import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { PeripheralLogicHelper, peripheralType } from '../../helpers/Peripheral/logic';

// TODO: remove after testing
const placeholderOtherPeripherals = [];
for(let i = 0; i < 5; i++){
  placeholderOtherPeripherals.push({
    id: i,
    name: `Capteur #${i}`,
    type: peripheralType.motionDetector,
  });
}

export const requestOtherPeripheralsList = createLogic({
  type: Constants.requestOtherPeripheralsList,
  latest: true,
  process({ getState, action }, dispatch, done) {
    //TODO: find type
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.otherPeripheral,
      Actions.errorOtherPeripheralsList,
      getState(),
      dispatch
    );
    logicHelper.fetchPeripherals()
      .then((items) => {
        if (items.length > 0) {
          dispatch(Actions.receiveOtherPeripheralsList(items));
        } else {
          // TODO: remove after testing
          dispatch(Actions.receiveOtherPeripheralsList(placeholderOtherPeripherals));
        }
      })
      .catch(() => dispatch(Actions.receiveOtherPeripheralsList(placeholderOtherPeripherals)))// TODO: remove after testing
      .then(() => done());
  }
});

export const requestCreateOtherPeripheral = createLogic({
  type: Constants.requestCreateOtherPeripheral,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      undefined,
      Actions.errorCreateOtherPeripheral,
      getState(),
      dispatch
    );
    logicHelper.createPeripheral(action.name, action.bluetoothAddress, action.peripheralType)
    .then((data) => {
      dispatch(Actions.successfulCreateOtherPeripheral(data.value));
    })
    .catch()
    .then(() => done());
  }
});
