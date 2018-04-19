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
