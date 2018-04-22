import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { PeripheralLogicHelper, peripheralType } from '../../helpers/Peripheral/logic';

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
        dispatch(Actions.receiveLocksList(items));
      })
      .catch(() => {})
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

export const startLocksListFetchInterval = createLogic({
  type: Constants.startLocksListFetchInterval,
  latest: true,
  transform({ getState, action, dispatch }, next) {
    let interval = getState().locks.list.interval;
    if (!interval) {
      interval = setInterval(() => {
        dispatch(Actions.requestLocksList());
      }, 2000);
    }
    next({
      ...action,
      interval
    });
  }
});
