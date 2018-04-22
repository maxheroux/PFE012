import { createLogic } from 'redux-logic';
import * as Constants from './constants';
import * as Actions from './actions';
import { AjaxUtils } from '../../../utils';
import { PeripheralLogicHelper, peripheralType } from '../../helpers/Peripheral/logic';

export const requestOtherPeripheralsList = createLogic({
  type: Constants.requestOtherPeripheralsList,
  process({ getState, action }, dispatch, done) {
    //TODO: find type
    const logicHelper = new PeripheralLogicHelper(
      'Sensors',
      Actions.errorOtherPeripheralsList,
      getState(),
      dispatch
    );
    logicHelper.fetchPeripherals()
      .then((items) => {
        dispatch(Actions.receiveOtherPeripheralsList(items));
      })
      .catch(() => {})
      .then(() => done());
  }
});

export const requestCreateOtherPeripheral = createLogic({
  type: Constants.requestCreateOtherPeripheral,
  latest: true,
  process({ getState, action }, dispatch, done) {
    let data;
    let url;
    if (action.peripheralType == peripheralType.RFIDTag){
      url = 'rfidtag/add';
      data = {
        username: getState().connection.username,
        token: getState().connection.token,
        tagId: action.identificator
      }
    } else {
      url = 'peripheral/add';
      data = {
        username: getState().connection.username,
        token: getState().connection.token,
        name: action.name,
        bluetoothId: action.bluetoothAddress,
        type: action.peripheralType
      }
    }
    const request = AjaxUtils.createPostRequest(url, data);
    return AjaxUtils.performRequest(request, (data) => {
      return data;
    }).then((data) => {
      dispatch(Actions.successfulCreateOtherPeripheral(data.value));
    })
    .catch(error => {
      dispatch(Actions.errorCreateOtherPeripheral(error.message))
    })
    .then(() => done());;
  }
});
