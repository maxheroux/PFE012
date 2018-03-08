// @flow
import * as Constants from './constants';
import PeripheralReducerHelper from '../../helpers/Peripheral/reducer';

export type light = {
  id: number,
  name: string,
  color: string,
  brightness: number,
}

type list = {
  list: Array<light>,
  isFetching: boolean,
  error: string,
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
	Constants.requestLightsList,
	Constants.receiveLightsList,
	Constants.errorLightsList,
	Constants.requestCreateLight,
	Constants.successfulCreateLight,
	Constants.errorCreateLight,
	Constants.requestModifyLight,
	Constants.successfulModifyLight,
	Constants.errorModifyLight
);

export default function lightsReducer(state: state = initialState, action: any) {
  return reducerHelper.updateState(state, action);
}
