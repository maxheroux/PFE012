import * as Constants from './constants';

export const requestLocksList = () => ({
  type: Constants.requestLocksList
});

export const receiveLocksList = (list) => ({
  type: Constants.receiveLocksList,
  list
});

export const errorLocksList = (error) => ({
  type: Constants.errorLocksList,
  error
});

export const startLocksListFetchInterval = (interval) => ({
  type: Constants.startLocksListFetchInterval,
  interval
});

export const requestCreateLock = (name, bluetoothAddress) => ({
  type: Constants.requestCreateLock,
  name,
  bluetoothAddress
});

export const successfulCreateLock = (id) => ({
  type: Constants.successfulCreateLock,
  id
});

export const errorCreateLock = (error) => ({
  type: Constants.errorCreateLock,
  error
});

export const requestModifyLock = (ids, isLocked) => ({
  type: Constants.requestModifyLock,
  ids,
  isLocked,
});

export const successfulModifyLock = () => ({
  type: Constants.successfulModifyLock,
});

export const errorModifyLock = (error) => ({
  type: Constants.errorModifyLock,
  error
});
