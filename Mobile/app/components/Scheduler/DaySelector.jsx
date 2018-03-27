// @flow
import * as React from 'react';
import { Text, Container, Spinner, ListItem, Left, Body, Right, Button } from 'native-base';
import { ScrollView, View } from 'react-native';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { map, some, filter } from 'lodash';

type Props = {
  onConfirm: (selectedDays: Array<number>) => {},
  onCancel: () => {},
  isVisible: boolean,
};

type State = {
  selectedDays: Array<number>,// numbers corresponding to the selected days (Ex: 0 = dimanche, 1 = lundi)
};

const style = {
  button: {
    margin: 10
  },
}

const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

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

    const list = map(days, (day, index) => {
      const isCurrentlySelected = some(selectedDays, dayId => dayId == index);
      const rightContent = isCurrentlySelected &&
        <Ionicons name="ios-checkmark" size={25} color="#b5b5b5"/>;
      return (
        <ListItem onPress={this.toggleDaySelected(index).bind(this)}>
          <Body>
            {day}
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
          {list}
          <View style={style.button}>
            <Button block onPress={onConfirm(selectedDays)}>
              <Text>Confirmer</Text>
            </Button>
          </View>
          <View style={style.button}>
            <Button block transparent onPress={onCancel}>
              <Text>Annuler</Text>
            </Button>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
