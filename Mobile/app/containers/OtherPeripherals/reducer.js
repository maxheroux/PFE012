// @flow
import * as Constants from './constants';
import PeripheralReducerHelper from '../../helpers/Peripheral/reducer';
import { peripheralType } from '../../helpers/Peripheral/logic';

export type otherPeripheral = {
  id: number,
  name: string,
  type: peripheralType,
}

type list = {
  list: Array<otherPeripheral>,
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
  Constants.requestOtherPeripheralsList,
  Constants.receiveOtherPeripheralsList,
  Constants.errorOtherPeripheralsList,
  Constants.requestCreateOtherPeripheral,
  Constants.successfulCreateOtherPeripheral,
  Constants.errorCreateOtherPeripheral,
  undefined,
  undefined,
  undefined
);

export default function otherPeripheralsReducer(state: state = initialState, action: any) {
  switch(action.type){
    default:
      return reducerHelper.updateState(state, action);
  }
}
