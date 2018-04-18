import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { map, filter, isEmpty } from 'lodash';

// TODO: remove after testing
const placeholderAlerts = [];
for(let i = 0; i < 5; i++){
  placeholderAlerts.push({
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
    const request = AjaxUtils.createPostRequest('alert/list', connectionInfo); // TODO: find url
    AjaxUtils.performRequest(request, (data) => {
      const dataWithValue = filter(data, i => !isEmpty(i));
      const items = map(dataWithValue, (item) => ({
        date: item.dateTime,
        message: item.description,
        isRead: true,
      }));

      if (items.length > 0) {
        dispatch(Actions.receiveAlertsList(items));
      } else {
        // TODO: remove after testing
        dispatch(Actions.receiveAlertsList(placeholderAlerts));
      }
    })
    .catch(error => {
      dispatch(Actions.receiveAlertsList(placeholderAlerts))
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
      }, 5000);
    }
    next({
      ...action,
      interval
    });
  }
});
