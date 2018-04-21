import * as React from 'react';
import { connect } from 'react-redux';
import CreateOtherPeripheralComponent from '../../components/OtherPeripherals/Create';
import * as Actions from './actions';

type Props = {
  submitPeripheral: (
    name: string,
    bluetoothAddress: string,
    type: string,
    identificator: string) => void,
  error: string,
  isFetching: boolean,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.otherPeripherals.create.error,
  isFetching: state.otherPeripherals.create.isFetching,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitPeripheral: (name, bluetoothAddress, type, identificator) => {
    dispatch(Actions.requestCreateOtherPeripheral(name, bluetoothAddress, type, identificator));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class CreateOtherPeripheral extends React.Component<Props, State> {

  render() {
    return (
      <CreateOtherPeripheralComponent {...this.props} />
    )
  }
}
