// @flow
import * as Constants from './constants';
import PeripheralReducerHelper from '../../helpers/Peripheral/reducer';

export type lock = {
  id: number,
  name: string,
  isLocked: boolean,
}

type list = {
  list: Array<lock>,
  isFetching: boolean,
  error: string,
  interval: any,
}

type create = {
  isFetching: boolean,
  error: string,
}

type modify = {
  isFetching: boolean,
  error: string,
}

type state = {
  list: list,
  modify: modify,
  create: create,
}

const initialState: state = {
  list: {
    list: [],
    isFetching: false,
    hasFetchedOnce: false,
    error: undefined,
    interval: undefined,
  },
  modify: {
    isFetching: false,
    error: undefined,
  },
  create: {
    isFetching: false,
    error: undefined,
  },
};

const reducerHelper = new PeripheralReducerHelper(
  Constants.requestLocksList,
  Constants.receiveLocksList,
  Constants.errorLocksList,
  Constants.requestCreateLock,
  Constants.successfulCreateLock,
  Constants.errorCreateLock,
  Constants.requestModifyLock,
  Constants.successfulModifyLock,
  Constants.errorModifyLock
);

export default function locksReducer(state: state = initialState, action: any) {
  switch(action.type){
    case Constants.startLocksListFetchInterval :
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
      return reducerHelper.updateState(state, action);
  }
}
