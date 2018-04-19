import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { PeripheralLogicHelper, peripheralType } from '../../helpers/Peripheral/logic';

// TODO: remove after testing
const placeholderLocks = [];
for(let i = 0; i < 5; i++){
  placeholderLocks.push({
    id: i,
    name: `Serrure #${i}`,
    isLocked: i % 2 == 0,
  });
}

export const requestLocksList = createLogic({
  type: Constants.requestLocksList,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.lock,
      Actions.errorLocksList,
      getState(),
      dispatch
    );
    logicHelper.fetchPeripherals()
      .then((items) => {
        if (items.length > 0) {
          dispatch(Actions.receiveLocksList(items));
        } else {
          // TODO: remove after testing
          dispatch(Actions.receiveLocksList(placeholderLocks));
        }
      })
      .catch(() => dispatch(Actions.receiveLocksList(placeholderLocks)))// TODO: remove after testing
      .then(() => done());
  }
});

export const requestModifyLock = createLogic({
  type: Constants.requestModifyLock,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.lock,
      Actions.errorModifyLock,
      getState(),
      dispatch
    );
    const value = {
      isLocked: action.isLocked,
    };
    const itemSuccessFn = (data) => {
      dispatch(Actions.successfulModifyLock(data.updateValue));
    }
    logicHelper.modifyPeripherals(
      action.ids,
      value,
      itemSuccessFn)
      .catch()
      .then(() => done());

  }
});

export const requestCreateLock = createLogic({
  type: Constants.requestCreateLock,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.lock,
      Actions.errorCreateLock,
      getState(),
      dispatch
    );
    logicHelper.createPeripheral(action.name, action.bluetoothAddress)
    .then((data) => {
      dispatch(Actions.successfulCreateLock(data.value));
    })
    .catch()
    .then(() => done());
  }
});
