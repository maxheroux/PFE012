import * as React from 'react';
import { connect } from 'react-redux';
import CreatePeripheralComponent from '../../components/Peripheral/Create';
import * as Actions from './actions';

type Props = {
  submitPeripheral: (name: string, bluetoothAddress: string) => void,
  error: string,
  isFetching: boolean,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.lights.create.error,
  isFetching: state.lights.create.isFetching,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitPeripheral: (name, bluetoothAddress) => {
    dispatch(Actions.requestCreateLight(name, bluetoothAddress));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class CreateLight extends React.Component<Props, State> {

  render() {
    return (
      <CreatePeripheralComponent {...this.props} />
    )
  }
}
