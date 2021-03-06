// @flow
import * as React from 'react';
import { Text, Container, Spinner, Button } from 'native-base';
import { ScrollView, View } from 'react-native';
import { map, get, some, find, filter } from 'lodash';
import TimeTempSelector from './TimeTempSelector';
import DailyScheduleListItem from './DailyScheduleListItem';

type ListItem = {
  hour: number,
  temperature: number,
}

type Props = {
  listItems: Array<ListItem>,
  addNewListItem: (hour: number, temperature: number) => void,
  removeSchedule: () => void,
  goBack: () => void,
  error: string,
  isFetching: boolean,
};

type State = {
  isTimeTempSelectorOpen: boolean,
};

const style = {
  button: {
    margin: 10
  },
  noContentText: {
    textAlign: 'center',
    padding: 15,
  },
  error: {
    color: 'red',
    margin: 10,
    textAlign: 'center'
  },
}

export default class DailySchedule extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isTimeTempSelectorOpen: false,
    };
  }

  render() {
    const { isTimeTempSelectorOpen } = this.state;
    const { listItems, addNewListItem, goBack, removeSchedule, error, isFetching } = this.props;

    if (isFetching) {
      return <Spinner color='rgb(90,200,250)' />;
    }
    if (error) {
      <Text style={style.error}>{error}</Text>
    }

    const timeTempSelectorProps = {
      onConfirm: (hour: number, temperature: number) => {
        addNewListItem(hour, temperature);
        this.setState({ isTimeTempSelectorOpen: false });
      },
      onCancel: () => this.setState({ isTimeTempSelectorOpen: false }),
      isVisible: isTimeTempSelectorOpen,
    }

    const list = map(listItems, (item, index) => {
      const listItemProps = {
        hour: item.hour,
        temperature: item.temperature,
        name: `Température #${index + 1}`,
        key: `dailyScheduleListItem${index}`,
      }
      return <DailyScheduleListItem {...listItemProps} />;
    });

    const emptyContent = (
      <Text style={style.noContentText}>
        Cet horaire est vide.
      </Text>
    );

    const content = listItems.length > 0 ? list : emptyContent;

    return (
      <ScrollView>
        {content}
        <View style={style.button}>
          <Button block
            onPress={() => this.setState({ isTimeTempSelectorOpen: true })}>
            <Text>Nouvelle Température</Text>
          </Button>
        </View>
        <View style={style.button}>
          <Button block danger
            onPress={() => removeSchedule()}>
            <Text>Supprimer l'horaire</Text>
          </Button>
        </View>
        <View style={style.button}>
          <Button block transparent
            onPress={() => goBack()}>
            <Text>Retour à l'horaire</Text>
          </Button>
        </View>
        <TimeTempSelector {...timeTempSelectorProps} />
      </ScrollView>
    );
  }
}
