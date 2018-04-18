// @flow
import * as React from 'react';
import { Text, Container, Spinner, Button } from 'native-base';
import { ScrollView, View } from 'react-native';
import { map, get, some, find, filter } from 'lodash';
import DaySelector from './DaySelector';
import ScheduleListItem from './ScheduleListItem';
import type { ListItem } from '../../containers/Scheduler/Scheduler';

type Props = {
  listItems: Array<ListItem>,
  onItemSelection: (index: number) => void,
  onNewSchedule: () => void
};

type State = {
  isDaySelectorOpen: boolean,
};

const style = {
  button: {
    margin: 10
  },
  noContentText: {
    textAlign: 'center',
    padding: 15,
  }
}

export default class ScheduleList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isDaySelectorOpen: false,
    };
  }

  render() {
    const { isDaySelectorOpen } = this.state;
    const { onItemSelection, onNewSchedule, listItems } = this.props;

    const headerProps = {
      title: 'Programmation',
      create: () => this.setState({ isDaySelectorOpen: true }),
    };
    const daySelectorProps = {
      onConfirm: (selectedDays) => {
        onNewSchedule(selectedDays);
        this.setState({ isDaySelectorOpen: false });
      },
      onCancel: () => this.setState({ isDaySelectorOpen: false }),
      isVisible: isDaySelectorOpen,
    }

    const list = map(listItems, (item, index) => {
      const listItemProps = {
        selectedDays: item.selectedDays,
        name: `Horaire #${index + 1}`,
        key: `scheduleListItem${index}`,
        onClick: () => onItemSelection(index),
      }
      return <ScheduleListItem {...listItemProps} />;
    });

    const emptyContent = (
      <Text style={style.noContentText}>
        Vous n'avez aucune programmation pour ce type d'appareil.
      </Text>
    );

    const content = listItems.length > 0 ? list : emptyContent;

    return (
      <ScrollView>
        {content}
        <View style={style.button}>
          <Button block
            onPress={() => this.setState({ isDaySelectorOpen: true })}>
            <Text>Nouvel horaire</Text>
          </Button>
        </View>
        <DaySelector {...daySelectorProps} />
      </ScrollView>
    );
  }
}
