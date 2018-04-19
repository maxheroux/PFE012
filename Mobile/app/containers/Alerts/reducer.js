// @flow
import * as Constants from './constants';

export type alert = {
  id: number,
  date: string,
  message: string,
  isRead: boolean,
}

type list = {
  list: Array<alert>,
  isFetching: boolean,
  error: string,
  interval: any
}

type state = {
  list: list,
}

const initialState: state = {
  list: {
    list: [],
    isFetching: false,
    hasFetchedOnce: false,
    error: undefined,
    interval: undefined,
  },
};

export default function alertsReducer(state: state = initialState, action: any) {
  switch(action.type){
    case Constants.requestAlertsList:
      return {
        ...state,
        list: {
          ...state.list,
          isFetching: true,
          error: undefined
        }
      };
    case Constants.receiveAlertsList:
      return {
        ...state,
        list: {
          ...state.list,
          isFetching: false,
          hasFetchedOnce: true,
          error: undefined,
          list: action.list
        }
      };
    case Constants.errorAlertsList:
      return {
        ...state,
        list: {
          ...state.list,
          isFetching: false,
          hasFetchedOnce: true,
          error: action.error,
        }
      };
    case Constants.startAlertsListFetchInterval :
      if (action.interval) {
        return {
          ...state,
          list: {
            ...state.list,
            interval: action.interval,
          }
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
