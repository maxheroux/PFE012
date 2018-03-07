import * as Constants from './constants';

export const requestLightsList = () => ({
  type: Constants.requestLightsList
});

export const receiveLightsList = (list) => ({
  type: Constants.receiveLightsList,
  list
});

export const errorLightsList = (error) => ({
  type: Constants.errorLightsList,
  error
});

export const requestCreateLight = (name, bluetoothAddress) => ({
  type: Constants.requestCreateLight,
  name,
  bluetoothAddress
});

export const successfulCreateLight = (id) => ({
  type: Constants.successfulCreateLight,
  id
});

export const errorCreateLight = (error) => ({
  type: Constants.errorCreateLight,
  error
});

export const requestModifyLight = (ids, color, brightness) => ({
  type: Constants.requestModifyLight,
  ids,
  color,
  brightness,
});

export const successfulModifyLight = () => ({
  type: Constants.successfulModifyLight,
});

export const errorModifyLight = (error) => ({
  type: Constants.errorModifyLight,
  error
});
