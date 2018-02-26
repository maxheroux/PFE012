// @flow
import * as Constants from './constants';

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

export default function thermostatsReducer(state: state = initialState, action: any) {
  switch (action.type) {
    // List
    case Constants.requestThermostatsList:
      return {
        ...state,
        list: {
          ...state.list,
          isFetching: true,
          error: undefined
        }
      };
    case Constants.receiveThermostatsList:
      return {
        ...state,
        list: {
          ...state.list,
          isFetching: false,
          error: undefined,
          list: action.list
        }
      };
    case Constants.errorThermostatsList:
      return {
        ...state,
        list: {
          ...state.list,
          isFetching: false,
          error: action.error,
        }
      };
    // Create
    case Constants.requestCreateThermostat:
      return {
        ...state,
        create: {
          isFetching: true,
          error: undefined,
        }
      };
    case Constants.successfulCreateThermostat:
      return {
        ...state,
        create: {
          isFetching: false,
          error: undefined,
        }
      };
    case Constants.errorCreateThermostat:
      return {
        ...state,
        create: {
          isFetching: false,
          error: action.error,
        }
      };
    // Modify
    case Constants.requestModifyThermostat:
      return {
        ...state,
        modify: {
          isFetching: true,
          error: undefined,
        }
      };
    case Constants.successfulModifyThermostat:
      return {
        ...state,
        modify: {
          isFetching: false,
          error: undefined,
        }
      };
    case Constants.errorModifyThermostat:
      return {
        ...state,
        modify: {
          isFetching: false,
          error: action.error,
        }
      };
    default:
      return state;
  }
}
