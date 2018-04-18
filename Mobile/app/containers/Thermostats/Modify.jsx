import * as React from 'react';
import { connect } from 'react-redux';
import { filter, map, meanBy } from 'lodash';
import Details from '../../components/Thermostats/Details';
import * as Actions from './actions';

type Props = {
  saveChanges: () => void,
  updateTargetTemperature: () => void,
  updateSchedule: () => void,
  error: string,
  isFetching: boolean,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  thermostatList: state.thermostats.list.list,
  modificationStatus: state.thermostats.modify,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveChanges: (ids, modeIndex) => {
    dispatch(Actions.requestModifyThermostat(ids, modeIndex));
  },
  updateTargetTemperature: (newTargetTemperature) => {
    dispatch(Actions.updateTargetTemperature(newTargetTemperature));
  },
  updateSchedule: (newSchedules) => {
    dispatch(Actions.updateSchedule(newSchedules));
  },
  fetchSchedules: (ids) => {
    dispatch(Actions.requestSchedules(ids));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ModifyThermostat extends React.Component<Props, State> {

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const selectedIds = params ? params.itemIdList : [];
    this.props.fetchSchedules(selectedIds);
  }

  render() {
    const {
      saveChanges,
      thermostatList,
      updateTargetTemperature,
      updateSchedule,
      modificationStatus
     } = this.props;
    const { params } = this.props.navigation.state;
    const selectedIds = params ? params.itemIdList : [];
    const selectedItems = filter(thermostatList, (item) => selectedIds.includes(item.id));
    const childProps = {
      saveChanges: (modeIndex) => saveChanges(selectedIds, modeIndex),
      updateTargetTemperature,
      updateSchedule,
      modificationStatus,
      nameList: map(selectedItems, i => i.name),
      currentTemperature: Math.round(meanBy(selectedItems, i => i.currentTemp) * 10) / 10,
      targetTemperature: modificationStatus.newTargetTemperature || `${Math.round(meanBy(selectedItems, i => i.targetTemp))}`,
      currentHumidity: Math.round(meanBy(selectedItems, i => i.currentHumidity) * 10) / 10
    };
    return (
      <Details {...childProps} />
    )
  }
}
