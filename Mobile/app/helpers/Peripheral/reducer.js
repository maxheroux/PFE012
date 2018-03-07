export default class PeripheralReducerHelper {
  constructor(
    requestPeripheralsList,
    receivePeripheralsList,
    errorPeripheralsList,
    requestCreatePeripheral,
    successfulCreatePeripheral,
    errorCreatePeripheral,
    requestModifyPeripheral,
    successfulModifyPeripheral,
    errorModifyPeripheral
  ){
    this.requestPeripheralsList = requestPeripheralsList;
    this.receivePeripheralsList = receivePeripheralsList;
    this.errorPeripheralsList = errorPeripheralsList;
    this.requestCreatePeripheral = requestCreatePeripheral;
    this.successfulCreatePeripheral = successfulCreatePeripheral;
    this.errorCreatePeripheral = errorCreatePeripheral;
    this.requestModifyPeripheral = requestModifyPeripheral;
    this.successfulModifyPeripheral = successfulModifyPeripheral;
    this.errorModifyPeripheral = errorModifyPeripheral;
  }

  updateState(state, action){
    switch (action.type) {
      // List
      case this.requestPeripheralsList:
        return {
          ...state,
          list: {
            ...state.list,
            isFetching: true,
            error: undefined
          }
        };
      case this.receivePeripheralsList:
        return {
          ...state,
          list: {
            ...state.list,
            isFetching: false,
            error: undefined,
            list: action.list
          }
        };
      case this.errorPeripheralsList:
        return {
          ...state,
          list: {
            ...state.list,
            isFetching: false,
            error: action.error,
          }
        };
      // Create
      case this.requestCreatePeripheral:
        return {
          ...state,
          create: {
            isFetching: true,
            error: undefined,
          }
        };
      case this.successfulCreatePeripheral:
        return {
          ...state,
          create: {
            isFetching: false,
            error: undefined,
          }
        };
      case this.errorCreatePeripheral:
        return {
          ...state,
          create: {
            isFetching: false,
            error: action.error,
          }
        };
      // Modify
      case this.requestModifyPeripheral:
        return {
          ...state,
          modify: {
            isFetching: true,
            error: undefined,
          }
        };
      case this.successfulModifyPeripheral:
        return {
          ...state,
          modify: {
            isFetching: false,
            error: undefined,
          }
        };
      case this.errorModifyPeripheral:
        return {
          ...state,
          modify: {
            isFetching: false,
            error: action.error,
          }
        };
      case 'Navigation/NAVIGATE':
        return {
          ...state,
          modify: {
            ...state.modify,
            error: undefined,
          },
          create: {
            ...state.create,
            error: undefined,
          }
        };
      default:
        return state;
    }
  }
}
