// @flow
import * as Constants from './constants';
import PeripheralReducerHelper from '../../helpers/Peripheral/reducer';

export type thermostat = {
  id: number,
  name: string,
  currentTemp: number,
  targetTemp: number,
  currentHumidity: number,
}

type list = {
  list: Array<thermostat>,
  isFetching: boolean,
  error: string,
  interval: any
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
  Constants.requestThermostatsList,
  Constants.receiveThermostatsList,
  Constants.errorThermostatsList,
  Constants.requestCreateThermostat,
  Constants.successfulCreateThermostat,
  Constants.errorCreateThermostat,
  Constants.requestModifyThermostat,
  Constants.successfulModifyThermostat,
  Constants.errorModifyThermostat
);

export default function thermostatsReducer(state: state = initialState, action: any) {
  switch(action.type){
    case Constants.startThermostatsListFetchInterval :
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
