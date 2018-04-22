// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import * as NavigationActions from '../Navigation/actions';
import ScheduleList from '../../components/Scheduler/ScheduleList';
import DailySchedule from '../../components/Scheduler/DailySchedule';
import { filter } from 'lodash';

export type DailyListItem = {
  hour: number,
  temperature: number,
}

export type ListItem = {
  selectedDays: Array<number>,
  dailySchedule: Array<DailyListItem>,
}

export type Props = {
  schedules: Array<ListItem>,
  error: string,
  isFetching: boolean,
  updateSchedule: (newSchedule: Array<ListItem>) => void,
  onGenerateSchedule: () => void,
};

type State = {
  isModifyingDailySchedule: boolean,
  selectedScheduleIndex: number,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isModifyingDailySchedule: false,
      selectedScheduleIndex: 0,
    };
  }

  addNewSchedule(selectedDays: Array<number>) {
    const currentListItems = this.props.schedules;
    const newListItems = currentListItems.concat([
      {
        selectedDays,
        dailySchedule: [],
      }
    ]);
    this.props.updateSchedule(newListItems);
  }

  removeSchedule(scheduleIndex: number) {
    const listItems = filter(this.props.schedules, (s, i) => i != scheduleIndex);
    this.props.updateSchedule(listItems);
    this.setState({
      isModifyingDailySchedule: false,
    });
  }

  addNewDailySchedule(scheduleIndex: number, hour: number, temperature: number) {
    const listItems = [...this.props.schedules];
    listItems[scheduleIndex] = {
      ...listItems[scheduleIndex],
      dailySchedule: [
        ...listItems[scheduleIndex].dailySchedule,
        {
          hour,
          temperature
        }
      ],
    }
    this.props.updateSchedule(listItems);
  }

  modifyDailySchedule(index: number) {
    this.setState({
      isModifyingDailySchedule: true,
      selectedScheduleIndex: index,
    });
  }

  backToSchedule() {
    this.setState({
      isModifyingDailySchedule: false,
    });
  }

  render() {
    const {
      isModifyingDailySchedule,
      selectedScheduleIndex,
    } = this.state;
    const {
      schedules,
      error,
      isFetching,
      onGenerateSchedule,
    } = this.props;

    if (isModifyingDailySchedule && !isFetching) {
      const addFn = this.addNewDailySchedule.bind(this);
      const removeFn = this.removeSchedule.bind(this);
      const dailyScheduleProps = {
        listItems: schedules[selectedScheduleIndex].dailySchedule,
        addNewListItem: (hour, temperature) =>
          addFn(selectedScheduleIndex, hour, temperature),
        removeSchedule: () => removeFn(selectedScheduleIndex),
        goBack: this.backToSchedule.bind(this),
        error,
        isFetching,
      }
      return (
        <DailySchedule {...dailyScheduleProps}/>
      );
    }

    const scheduleProps = {
      listItems: schedules,
      onItemSelection: index => this.modifyDailySchedule(index),
      onNewSchedule: selectedDays => this.addNewSchedule(selectedDays),
      onGenerateSchedule
    }
    return (
      <ScheduleList {...scheduleProps}/>
    );
  }
}
