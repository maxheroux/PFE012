// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { ListItem as DailyListItem } from './DailySchedule';
import * as NavigationActions from '../Navigation/actions';
import ScheduleList from '../../components/Scheduler/ScheduleList';

export type ListItem = {
  selectedDays: Array<number>,
  dailySchedule: Array<DailyListItem>,
}

export type Props = {
  initialValues: ?Array<ListItem>,
  onItemSelection: ?(
    listItems: [],
    onSubmit: (scheduleIndex: number, dailySchedule: Array<DailyListItem>) => void
  ) => void
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onItemSelection: (scheduleIndex, listItems, onSubmit) => {
    dispatch(NavigationActions.goToDailySchedule(scheduleIndex, listItems, onSubmit, 'ModifyThermostat'));
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends React.Component<Props, State> {

  render() {
    return (
      <ScheduleList {...this.props}/>
    );
  }
}
