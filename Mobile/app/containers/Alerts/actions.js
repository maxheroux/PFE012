import * as Constants from './constants';

export const requestAlertsList = () => ({
  type: Constants.requestAlertsList
});

export const receiveAlertsList = (list) => ({
  type: Constants.receiveAlertsList,
  list
});

export const errorAlertsList = (error) => ({
  type: Constants.errorAlertsList,
  error
});

export const startAlertsListFetchInterval = (interval) => ({
  type: Constants.startAlertsListFetchInterval,
  interval
});

export const requestMarkAlertRead = () => ({
  type: Constants.requestMarkAlertRead
});

export const receiveMarkAlertRead = () => ({
  type: Constants.receiveMarkAlertRead
});

export const errorMarkAlertRead = (error) => ({
  type: Constants.errorMarkAlertRead,
  error
});
