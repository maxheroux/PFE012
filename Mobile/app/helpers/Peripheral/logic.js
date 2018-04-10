import { filter, map, find } from 'lodash';
import { AjaxUtils } from '../../../utils';
import * as NavigationActions from '../../containers/Navigation/actions';

export const peripheralType = {
  thermostat: 'Thermostat',
  light: 'Light',
  lock: 'Lock',
  RFIDReader: 'RFIDReader',
  motionDetector: 'MotionDetector',
  CODetector: 'CODetector',
}

const ThermoMapFn = (item, rawData) => {
  item.currentTemp = rawData.currentTemperature;
  item.targetTemp = rawData.requestedTemperature;
  item.currentHumidity = rawData.currentHumidity;
}

const LightMapFn = (item, rawData) => {
  item.color = rawData.color;
  item.brightness = rawData.brightness;
}

const LockMapFn = (item, rawData) => {
  item.isLocked = rawData.isLocked;
}

const SensorMapFn = (item, rawData) => {
  item.type = rawData.type;
}

const getMapFn = (type) => {
  switch (type) {
    case peripheralType.thermostat:
      return ThermoMapFn;
    case peripheralType.light:
      return LightMapFn;
    case peripheralType.lock:
      return LockMapFn;
    case peripheralType.RFIDReader:
    case peripheralType.motionDetector:
    case peripheralType.CODetector:
      return SensorMapFn;
  }
}

export class PeripheralLogicHelper {
  constructor(
    type,
    errorAction,
    state,
    dispatch
  ){
    this.type = type;
    this.errorAction = errorAction;
    this.connectionInfo = {
      username: state.connection.username,
      token: state.connection.token,
    }
    this.dispatch = dispatch;
  }

  fetchPeripherals() {
    //get the list of all peripherals
    const request = AjaxUtils.createPostRequest('peripheral/list', this.connectionInfo);
    return AjaxUtils.performRequest(request, async (data) => {
      //extract wanted peripherals from the list
      let filteredPeripherrals = [];
      if (this.type == 'Sensors') {
        filteredPeripherrals = filter(data, (item) =>
          item.type == peripheralType.RFIDReader ||
          item.type == peripheralType.motionDetector ||
          item.type == peripheralType.CODetector
        );
      } else {
        filteredPeripherrals = filter(data, (item) => item.type == this.type);
      }
      let items = map(filteredPeripherrals, (item) => ({
        id: item.id,
        name: item.name
      }));
      itemIds = map(items, item => item.id);

      const mapFn = getMapFn(this.type);

      //fetch additionnal info for each peripheral
      const loopRequest = (itemIds) => {
        if (itemIds.length > 0) {
          const id = itemIds[0];
          const remainingIds = itemIds.slice(1);
          return fetchPeripheralById(id)
            .then((data) => {
              //update the item list with the latest peripheral info
              const correspondingItem = find(items, item => item.id == id);
              mapFn(correspondingItem, data);
            })
            .then(() => loopRequest(remainingIds));
        }
      };

      //wait until we received the additionnal info of each peripheral
      await loopRequest(itemIds);

      return items;
    })
    .catch(error => {
      this.dispatch(this.errorAction(error.message))
      throw error;
    });
  }

  fetchPeripheralById(id) {
    const request = AjaxUtils.createPostRequest('/state/request', {
      ...this.connectionInfo,
      peripheralId: id,
    });
    return AjaxUtils.performRequest(request, (data) => {
      return data;
    });
  }

  modifyPeripherals(peripheralIdList, newValue, itemSuccessFn) {
      const loopRequest = (ids) => {
        if (ids.length > 0) {
          const id = ids[0];
          const remainingIds = ids.slice(1);
          const request = AjaxUtils.createPostRequest('state/change', {
            ...this.connectionInfo,
            peripheralId: id,
            value: newValue
          });
          return AjaxUtils.performRequest(request, (data) => {
            itemSuccessFn(data);
            if (remainingIds.length == 0) {
              this.dispatch(NavigationActions.goToRoute('Main'));
            }
          })
          .then(() => loopRequest(remainingIds));
        }
      };

      return loopRequest(peripheralIdList)
        .catch(error => {
          this.dispatch(this.errorAction(error.message))
          throw error;
        });
  }

  createPeripheral(name, bluetoothId, overrideType) {
    const request = AjaxUtils.createPostRequest('peripheral/add', {
      ...this.connectionInfo,
      name,
      bluetoothId,
      type: overrideType || this.type
    });
    return AjaxUtils.performRequest(request, (data) => {
      return data;
    })
    .catch(error => {
      this.dispatch(this.errorAction(error.message))
      throw error;
    });
  }

}
