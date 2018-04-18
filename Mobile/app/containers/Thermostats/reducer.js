// @flow
import * as Constants from './constants';
import PeripheralReducerHelper from '../../helpers/Peripheral/reducer';
import type { ListItem as SchedulerListItem } from '../Scheduler/Scheduler';

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

export type modify = {
  newTargetTemperature: string,
  schedules: {
    list: Array<SchedulerListItem>,
    isFetching: boolean,
    error: string,
  },
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
    newTargetTemperature: undefined,
    schedules: {
      list: [],
      isFetching: false,
      error: undefined,
    }
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
    case Constants.updateTargetTemperature :
      return {
        ...state,
        modify: {
          ...state.modify,
          newTargetTemperature: action.newTargetTemperature,
        }
      };
    case Constants.updateSchedule :
      return {
        ...state,
        modify: {
          ...state.modify,
          schedules: {
            ...state.modify.schedules,
            list: action.newSchedules
          }
        }
      };
      // fetch schedule
      case Constants.requestSchedules:
        return {
          ...state,
          modify: {
            ...state.modify,
            schedules: {
              list: [],
              isFetching: true,
              error: undefined,
            }
          }
        };
      case Constants.receiveSchedules:
        return {
          ...state,
          modify: {
            ...state.modify,
            schedules: {
              list: action.schedules,
              isFetching: false,
              error: undefined,
            }
          }
        };
      case Constants.errorSchedules:
        return {
          ...state,
          modify: {
            ...state.modify,
            schedules: {
              list: [],
              isFetching: false,
              error: action.error,
            }
          }
        };
      case 'Navigation/NAVIGATE':
        return {
          ...state,
          modify: {
            ...state.modify,
            error: undefined,
            schedules: {
              ...state.modify.schedules,
              error: undefined,
            }
          },
          create: {
            ...state.create,
            error: undefined,
          }
        };
    default:
      return reducerHelper.updateState(state, action);
  }
}
