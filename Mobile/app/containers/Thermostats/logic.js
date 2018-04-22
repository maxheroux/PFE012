import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { PeripheralLogicHelper, peripheralType } from '../../helpers/Peripheral/logic';
import { map, groupBy, filter } from 'lodash';
import * as NavigationActions from '../Navigation/actions';

export const requestThermostatsList = createLogic({
  type: Constants.requestThermostatsList,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.thermostat,
      Actions.errorThermostatsList,
      getState(),
      dispatch
    );
    logicHelper.fetchPeripherals()
      .then((items) => {
        dispatch(Actions.receiveThermostatsList(items));
      })
      .catch(() => {})
      .then(() => done());
  }
});

export const requestModifyThermostat = createLogic({
  type: Constants.requestModifyThermostat,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.thermostat,
      Actions.errorModifyThermostat,
      getState(),
      dispatch
    );

    if (action.modeIndex == 0) {
      // modify manual mode
      const newValue = getState().thermostats.modify.newTargetTemperature;
      if (newValue) {
        const value = {
          RequestedTemperature: String(newValue),
        };
        const itemSuccessFn = (data) => {
        }
        logicHelper.modifyPeripherals(
          action.ids,
          value,
          itemSuccessFn)
          .then(() => done());
      }
    }
    else
    {
      //modify schedule
      let formattedSchedule = [];
      const schedule = getState().thermostats.modify.schedules.list;
      action.ids.forEach(id => {

        let explodedScheduleDays = []
        schedule.forEach(s => {
          explodedScheduleDays = explodedScheduleDays.concat(
            map(s.selectedDays, d => ({
        			selectedDay: d,
        			dailySchedule: s.dailySchedule,
            }))
          );
        });

        let explodedDailySchedule = [];
        explodedScheduleDays.forEach(s => {
          explodedDailySchedule = explodedDailySchedule.concat(
            map(s.dailySchedule, d => ({
        			selectedDay: s.selectedDay,
        			hour: d.hour,
        			temperature: d.temperature,
            }))
          );
        })

        formattedSchedule = formattedSchedule.concat(
          map(explodedDailySchedule, s => ({
            idPeripheral: id,
      			dayOfWeek: s.selectedDay,
      			hourOfDay: s.hour,
      			value: {
      				desiredTemperature: s.temperature
      			}
          }))
        );
      });

      const request = AjaxUtils.createPostRequest('horaire/change', {
        username: getState().connection.username,
        token: getState().connection.token,
        scheduleList: formattedSchedule,
      });

      AjaxUtils.performRequest(request, (data) => {
        console.warn(JSON.stringify(data));
      })
      .then(() => {
        dispatch(Actions.successfulModifyThermostat());
        NavigationActions.goToMain();
      })
      .catch(e => {
        dispatch(Actions.errorModifyThermostat(e))
      })
      .then(() => done());
    }
  }
});

export const requestCreateThermostat = createLogic({
  type: Constants.requestCreateThermostat,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const logicHelper = new PeripheralLogicHelper(
      peripheralType.thermostat,
      Actions.errorCreateThermostat,
      getState(),
      dispatch
    );
    logicHelper.createPeripheral(action.name, action.bluetoothAddress)
    .then((data) => {
      dispatch(Actions.successfulCreateThermostat(data.value));
    })
    .catch()
    .then(() => done());
  }
});

export const startThermostatsListFetchInterval = createLogic({
  type: Constants.startThermostatsListFetchInterval,
  latest: true,
  transform({ getState, action, dispatch }, next) {
    let interval = getState().thermostats.list.interval;
    if (!interval) {
      interval = setInterval(() => {
        dispatch(Actions.requestThermostatsList());
      }, 2000);
    }
    next({
      ...action,
      interval
    });
  }
});

export const requestSchedules = createLogic({
  type: Constants.requestSchedules,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const request = AjaxUtils.createPostRequest('horaire/request', {
      username: getState().connection.username,
      token: getState().connection.token,
      peripheralIds: action.ids,
    });
    AjaxUtils.performRequest(request, (data) => {
      const list = formatReceivedScheduleList(data, action.ids.length);
      // send to reducer
      dispatch(Actions.receiveSchedules(list));
    })
    .catch(error => {
      dispatch(Actions.errorSchedules(error));
    })
    .then(() => done());
  }
});

export const generateSchedule = createLogic({
  type: Constants.generateSchedule,
  latest: true,
  process({ getState, action }, dispatch, done) {
    const request = AjaxUtils.createPostRequest('horaire/automatic', {
      username: getState().connection.username,
      token: getState().connection.token,
      peripheralIds: action.ids,
    });
    AjaxUtils.performRequest(request, (data) => {
      const list = formatReceivedScheduleList(data, action.ids.length);
      // send to reducer
      dispatch(Actions.receiveSchedules(list));
    })
    .catch(error => {
      dispatch(Actions.errorSchedules(error));
    })
    .then(() => done());
  }
});

const formatReceivedScheduleList = (rawSchedule, nbPeripherals) => {
  // only keep schedules that are shared by the majority of selected peripherals
  const majority = Math.floor(nbPeripherals / 2);
  const toString = (i) => `${i.hourOfDay} ${i.dayOfWeek} ${i.value.desiredTemperature}`
  let groupedList = groupBy(rawSchedule, i => toString(i));
  const filteredList = filter(groupedList, i => i.length > majority);

  // convert the schedule to the correct format
  const intermediaryList = map(filteredList, i => ({
    day: i[0].dayOfWeek,
    hour: i[0].hourOfDay,
    temperature: i[0].value.desiredTemperature,
  }));
  groupedList = groupBy(intermediaryList, i => `${i.hour} ${i.temperature}`);
  const goodFormatWithDuplicates = map(groupedList, (i) => ({
    selectedDays: map(i, x => x.day),
    dailySchedule: {
      hour: i[0].hour,
      temperature: i[0].temperature
    }

  }));

  // merge similar schedules together
  groupedList = groupBy(goodFormatWithDuplicates, i => JSON.stringify(i.selectedDays));
  const finalList = map(groupedList, i => ({
      selectedDays: i[0].selectedDays,
      dailySchedule: map(i, x => x.dailySchedule)
  }));

  return finalList;
}
