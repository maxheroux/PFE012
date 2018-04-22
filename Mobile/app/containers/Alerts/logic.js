import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { map, filter, isEmpty } from 'lodash';

// TODO: remove after testing
const placeholderAlerts = [];
for(let i = 0; i < 5; i++){
  placeholderAlerts.push({
    id: i,
    date: `12/12/2012`,
    message: `Message d'alerte #${i}`,
    isRead: false,
  });
}

export const requestAlertsList = createLogic({
  type: Constants.requestAlertsList,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const connectionInfo = {
      username: getState().connection.username,
      token: getState().connection.token,
    };
    const request = AjaxUtils.createPostRequest('alert/list', connectionInfo);
    AjaxUtils.performRequest(request, (data) => {
      const dataWithValue = filter(data, i => !isEmpty(i));
      const items = map(dataWithValue, (item) => ({
        id: item.id,
        date: `${item.dateTime.date.day}/${item.dateTime.date.month}/${item.dateTime.date.year} ${item.dateTime.time.hour}:${item.dateTime.time.minute}`,
        message: item.description,
        isRead: false,
      }));

      dispatch(Actions.receiveAlertsList(items));
    })
    .catch(error => {

    })
    .then(() => done());
  }
});

export const startAlertsListFetchInterval = createLogic({
  type: Constants.startAlertsListFetchInterval,
  latest: true,
  transform({ getState, action, dispatch }, next) {
    let interval = getState().alerts.list.interval;
    if (!interval) {
      interval = setInterval(() => {
        dispatch(Actions.requestAlertsList());
      }, 2000);
    }
    next({
      ...action,
      interval
    });
  }
});

export const requestMarkAlertRead = createLogic({
  type: Constants.requestMarkAlertRead,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const alertIds = map(getState().alerts.list.list, i => {
      return i.id;
    });
    const params = {
      username: getState().connection.username,
      token: getState().connection.token,
      alertIds,
    };
    const request = AjaxUtils.createPostRequest('alert/remove', params);
    AjaxUtils.performRequest(request, (data) => {
      dispatch(Actions.receiveMarkAlertRead());
      dispatch(Actions.requestAlertsList());
    })
    .catch(error => {
      dispatch(Actions.errorMarkAlertRead(`Une erreur est survenue. Les alertes n'ont pas pu être marquées comme lues.`));
    })
    .then(() => done());
  }
});
