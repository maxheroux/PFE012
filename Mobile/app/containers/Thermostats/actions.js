import * as Constants from './constants';

export const requestThermostatsList = () => ({
  type: Constants.requestThermostatsList
});

export const receiveThermostatsList = (list) => ({
  type: Constants.receiveThermostatsList,
  list
});

export const errorThermostatsList = (error) => ({
  type: Constants.errorThermostatsList,
  error
});

export const requestCreateThermostat = (name, bluetoothAddress) => ({
  type: Constants.requestCreateThermostat,
  name,
  bluetoothAddress
});

export const successfulCreateThermostat = (id) => ({
  type: Constants.successfulCreateThermostat,
  id
});

export const errorCreateThermostat = (error) => ({
  type: Constants.errorCreateThermostat,
  error
});

export const requestModifyThermostat = (ids, targetTemp) => ({
  type: Constants.requestModifyThermostat,
  ids,
  targetTemp,
});

export const successfulModifyThermostat = () => ({
  type: Constants.successfulModifyThermostat,
});

export const errorModifyThermostat = (error) => ({
  type: Constants.errorModifyThermostat,
  error
});
