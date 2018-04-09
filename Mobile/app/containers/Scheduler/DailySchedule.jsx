// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, Container, Spinner } from 'native-base';
import { ScrollView } from 'react-native';
import { map, get, some, find, filter } from 'lodash';
import shallowequal from 'shallowequal';
import Header from '../Layout/Header';
import * as NavigationActions from '../Navigation/actions';
import DailyScheduleComponent from '../../components/Scheduler/DailySchedule';

export type ListItem = {
  hour: number,
  temperature: number,
}

type Props = {
  goBackRoute: string,
  saveFn: () => void,
  initialValues: ?Array<ListItem>,
  goToRoute: () => void,
};

type State = {
  listItems: Array<ListItem>,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToRoute: () => {
    dispatch(NavigationActions.goToRoute(ownProps.navigation.state.goBackRoute));
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class DailySchedule extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listItems: this.props.navigation.state.initialValues || [],
    };
  }

  addNewListItem(hour: number, temperature: number) {
    const currentListItems = this.state.listItems;
    const newListItems = currentListItems.concat([
      {
        hour,
        temperature,
      }
    ]);
    this.setState({ listItems: newListItems });
  }

  render() {
    const { listItems } = this.state;
    const { goToRoute } = this.props;
    const { params } = this.props.navigation.state;
    const { goBackRoute, onSubmit, scheduleIndex } = params;

    const onConfirm = () => {
      onSubmit(scheduleIndex, listItems);
      goToRoute();
    };
    const componentProps = {
      listItems,
      addNewListItem: (hour, temperature) => this.addNewListItem(hour, temperature),
    };
    return (
      <Container>
        <Header
          title="Modifier horaire"
          goBackRoute={goBackRoute}
          rightBtnText={'OK'}
          rightBtnFn={onConfirm}
        />
        <DailyScheduleComponent {...componentProps}/>
      </Container>
    );
  }
}
