import * as React from 'react';
import { connect } from 'react-redux';
import CreateLockComponent from '../../components/Peripheral/Create';
import * as Actions from './actions';

type Props = {
  submitPeripheral: (name: string, bluetoothAddress: string) => void,
  error: string,
  isFetching: boolean,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.locks.create.error,
  isFetching: state.locks.create.isFetching,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitPeripheral: (name, bluetoothAddress) => {
    dispatch(Actions.requestCreateLock(name, bluetoothAddress));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class CreateLock extends React.Component<Props, State> {

  render() {
    return (
      <CreateLockComponent {...this.props} />
    )
  }
}
