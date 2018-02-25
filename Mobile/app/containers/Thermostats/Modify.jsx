import * as React from 'react';
import { connect } from 'react-redux';
import ModifyThermostatComponent from '../../components/Thermostats/Modify';
import * as Actions from './actions';

type Props = {
  modifyThermostat: (ids, targetTemp) => void,
  error: string,
  isFetching: boolean,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.thermostats.create.error,
  isFetching: state.thermostats.create.isFetching,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  modifyThermostat: (ids, targetTemp) => {
    dispatch(Actions.requestCreateThermostat(ids, targetTemp));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ModifyThermostat extends React.Component<Props, State> {

  render() {
    return (
      <ModifyThermostatComponent {...this.props} />
    )
  }
}
