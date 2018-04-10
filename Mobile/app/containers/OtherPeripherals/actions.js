import * as Constants from './constants';

export const requestOtherPeripheralsList = () => ({
  type: Constants.requestOtherPeripheralsList
});

export const receiveOtherPeripheralsList = (list) => ({
  type: Constants.receiveOtherPeripheralsList,
  list
});

export const errorOtherPeripheralsList = (error) => ({
  type: Constants.errorOtherPeripheralsList,
  error
});

export const requestCreateOtherPeripheral = (name, bluetoothAddress, peripheralType) => ({
  type: Constants.requestCreateOtherPeripheral,
  name,
  bluetoothAddress,
  peripheralType
});

export const successfulCreateOtherPeripheral = (id) => ({
  type: Constants.successfulCreateOtherPeripheral,
  id
});

export const errorCreateOtherPeripheral = (error) => ({
  type: Constants.errorCreateOtherPeripheral,
  error
});
