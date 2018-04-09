// @flow
import * as React from 'react';
import { Text, Container, Spinner, ListItem, Left, Body, Right, Button } from 'native-base';
import { ScrollView, View } from 'react-native';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { map, some, filter } from 'lodash';

type Props = {
  onConfirm: (selectedDays: Array<number>) => void,
  onCancel: () => void,
  isVisible: boolean,
};

type State = {
  selectedDays: Array<number>,// numbers corresponding to the selected days (Ex: 0 = dimanche, 1 = lundi)
};

const style = {
  button: {
    margin: 10
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  listItem: {
    height: 61,
  }
}

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default class DaySelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedDays: [],
    };
  }

  toggleDaySelected(id: number) {
    const currentlySelectedDays = this.state.selectedDays;
    const isCurrentlySelected = some(currentlySelectedDays, dayId => dayId == id);
    if (isCurrentlySelected){
      // removed the selected day
      this.setState({
        selectedDays: filter(currentlySelectedDays, dayId => dayId != id)
      });
    }else{
      //add the selected day
      this.setState({
        selectedDays: [
          ...currentlySelectedDays,
          id
        ]
      });
    }
  }

  render() {
    const { onConfirm, onCancel, isVisible } = this.props;
    const { selectedDays } = this.state;

    const wrappedConfirm = (selectedDays) => {
      this.setState({ selectedDays: [] });
      onConfirm(selectedDays);
    }

    const wrappedCancel = (selectedDays) => {
      this.setState({ selectedDays: [] });
      onCancel();
    }

    const list = map(days, (day, index) => {
      const isCurrentlySelected = some(selectedDays, dayId => dayId == index);
      const rightContent = isCurrentlySelected &&
        <Ionicons name="ios-checkmark" size={30} color="#b5b5b5"/>;
      return (
        <ListItem
          onPress={() => this.toggleDaySelected(index)}
          key={`daySelect${index}`}
          style={style.listItem}>
          <Body>
            <Text>{day}</Text>
          </Body>
          <Right>
            {rightContent}
          </Right>
        </ListItem>
      );
    });

    return (
      <Modal isVisible={isVisible}>
        <ScrollView>
          <View style={style.container}>
            {list}
            <View style={style.button}>
              <Button block onPress={() => wrappedConfirm(selectedDays)}>
                <Text>Confirmer</Text>
              </Button>
            </View>
            <View style={style.button}>
              <Button block transparent onPress={wrappedCancel}>
                <Text>Annuler</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
