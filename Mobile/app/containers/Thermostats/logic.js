import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { PeripheralLogicHelper, peripheralType } from '../../helpers/Peripheral/logic';

// TODO: remove after testing
const placeholderThermos = [];
for(let i = 0; i < 5; i++){
  placeholderThermos.push({
    id: i,
    name: `Thermo #${i}`,
    currentTemp: 20 + i,
    targetTemp: 18 + i,
    currentHumidity: 30 + i
  });
}

export const requestThermostatsList = createLogic({
  type: Constants.requestThermostatsList,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.thermostat,
      Actions.errorThermostatsList,
      getState(),
      dispatch
    );
    logicHelper.fetchPeripherals()
      .then((items) => {
        if (items.length > 0) {
          dispatch(Actions.receiveThermostatsList(items));
        } else {
          // TODO: remove after testing
          dispatch(Actions.receiveThermostatsList(placeholderThermos));
        }
      })
      .catch(() => dispatch(Actions.receiveThermostatsList(placeholderThermos)))// TODO: remove after testing
      .then(() => done());
  }
});

export const requestModifyThermostat = createLogic({
  type: Constants.requestModifyThermostat,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.thermostat,
      Actions.errorModifyThermostat,
      getState(),
      dispatch
    );
    const value = {
      RequestedTemperature: String(action.targetTemp),
    };
    const itemSuccessFn = (data) => {
      dispatch(Actions.successfulModifyThermostat(data.updateValue));
    }
    logicHelper.modifyPeripherals(
      action.ids,
      value,
      itemSuccessFn)
      .catch()
      .then(() => done());

  }
});

export const requestCreateThermostat = createLogic({
  type: Constants.requestCreateThermostat,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.thermostat,
      Actions.errorCreateThermostat,
      getState(),
      dispatch
    );
    logicHelper.createPeripheral(action.name, action.bluetoothAddress)
    .then((data) => {
      dispatch(Actions.successfulCreateThermostat(data.value));
    })
    .catch()
    .then(() => done());
  }
});

export const startThermostatsListFetchInterval = createLogic({
  type: Constants.startThermostatsListFetchInterval,
  latest: true,
  transform({ getState, action, dispatch }, next) {
    let interval = getState().thermostats.list.interval;
    if (!interval) {
      interval = setInterval(() => {
        dispatch(Actions.requestThermostatsList());
      }, 5000);
    }
    next({
      ...action,
      interval
    });
  }
});
