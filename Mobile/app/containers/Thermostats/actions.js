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

export const startThermostatsListFetchInterval = (interval) => ({
  type: Constants.startThermostatsListFetchInterval,
  interval
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

export const requestModifyThermostat = (ids, modeIndex) => ({
  type: Constants.requestModifyThermostat,
  ids,
  modeIndex,
});

export const successfulModifyThermostat = () => ({
  type: Constants.successfulModifyThermostat,
});

export const errorModifyThermostat = (error) => ({
  type: Constants.errorModifyThermostat,
  error
});

export const updateTargetTemperature = (newTargetTemperature) => ({
  type: Constants.updateTargetTemperature,
  newTargetTemperature
});

export const updateSchedule = (newSchedules) => ({
  type: Constants.updateSchedule,
  newSchedules
});

export const requestSchedules = (ids) => ({
  type: Constants.requestSchedules,
  ids
});

export const receiveSchedules = (schedules) => ({
  type: Constants.receiveSchedules,
  schedules
});

export const errorSchedules = (error) => ({
  type: Constants.errorSchedules,
  error
});
