import * as React from 'react';
import { connect } from 'react-redux';
import { filter, map, meanBy } from 'lodash';
import Details from '../../components/Thermostats/Details';
import * as Actions from './actions';

type Props = {
  modifyThermostat: (ids, targetTemp) => void,
  error: string,
  isFetching: boolean,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.thermostats.modify.error,
  isFetching: state.thermostats.modify.isFetching,
  thermostatList: state.thermostats.list.list
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  modifyThermostat: (ids, targetTemp) => {
    dispatch(Actions.requestModifyThermostat(ids, targetTemp));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ModifyThermostat extends React.Component<Props, State> {

  render() {
    const { modifyThermostat, error, isFetching, thermostatList } = this.props;
    const { params } = this.props.navigation.state;
    const selectedIds = params ? params.itemIdList : [];
    const selectedItems = filter(thermostatList, (item) => selectedIds.includes(item.id));
    const childProps = {
      modifyThermostat: (targetTemp) => modifyThermostat(selectedIds, targetTemp),
      error,
      isFetching,
      nameList: map(selectedItems, i => i.name),
      currentTemperature: Math.round(meanBy(selectedItems, i => i.currentTemp) * 10) / 10,
      targetTemperature: Math.round(meanBy(selectedItems, i => i.targetTemp)),
      currentHumidity: Math.round(meanBy(selectedItems, i => i.currentHumidity) * 10) / 10
    };
    return (
      <Details {...childProps} />
    )
  }
}
