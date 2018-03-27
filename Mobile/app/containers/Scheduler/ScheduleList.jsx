// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, Container, Spinner } from 'native-base';
import { ScrollView } from 'react-native';
import { map, get, some, find, filter } from 'lodash';
import shallowequal from 'shallowequal';
import * as Actions from './actions';
import Header from '../../components/Scheduler/Header';
import DaySelector from '../../components/Scheduler/DaySelector';
import ScheduleListItem from '../../components/Scheduler/DaySelector';

type Props = {
};

type State = {
  isDaySelectorOpen: boolean
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

@connect(mapStateToProps, mapDispatchToProps)
export default class ScheduleList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isDaySelectorOpen: false,
    };
  }

  render() {
    const { isDaySelectorOpen } = this.state;

    const headerProps = {
      title: 'Programmation',
      create: () => this.setState({ isDaySelectorOpen: true }),
    };
    const daySelectorProps = {
      onConfirm: (selectedDays) => {},// TODO: dispatch event
      onCancel: () => this.setState({ isDaySelectorOpen: false }),
      isVisible: isDaySelectorOpen,
    }
    const listItemProps = {
      selectedDays: [1,2,3,5],
      name: 'Horaire #1',
      onClick: () => {},
    }
    const content = [
      <ScheduleListItem {...listItemProps} />
    ];
    const emptyContent = (
      <Text>
        Vous n'avez aucune programmation pour ce type d'appareil.
        Cliquer le '+' au haut de cette page pour ajouter une nouvelle programmation.
      </Text>
    );

    return (
      <Container>
        <Header {...headerProps}/>
        <ScrollView>
          {content}
        </ScrollView>
        <DaySelector {...daySelectorProps} />
      </Container>
    );
  }
}
