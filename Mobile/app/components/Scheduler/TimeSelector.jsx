// @flow
import * as React from 'react';
import { Text, Container, Spinner, ListItem, Left, Body, Right, Button } from 'native-base';
import { ScrollView, View } from 'react-native';
import Modal from "react-native-modal";
import Picker from 'rmc-picker';

type Props = {
  onConfirm: (hour: number, minute: number) => {},
  onCancel: () => {},
  isVisible: boolean,
};

type State = {
  selectedHour: number,
  selectedMinute: number,
};

const style = {
  button: {
    margin: 10
  },
  pickersContainer: {
    flex: 1,
    flexDirection: 'row',
  }
}

let hourPickerValues = [];
for (let i = 0; i < 24; i++) {
  hourPickerValues.push(
    <Picker.Item value={`${i}`} key={i}>
      {`${i}°C`}
    </Picker.Item>
    );
}

let minutePickerValues = [];
for (let i = 0; i < 60; i++) {
  minutePickerValues.push(
    <Picker.Item value={`${i}`} key={i}>
      {`${i}°C`}
    </Picker.Item>
    );
}

export default class TimeSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedHour: 12,
      selectedMinute: 0,
    };
  }

  render() {
    const { onConfirm, onCancel, isVisible } = this.props;
    const { selectedHour, selectedMinute } = this.state;

    return (
      <Modal isVisible={isVisible}>
        <ScrollView>
          <View style={style.pickersContainer}>
            <Picker
              selectedValue={selectedHour}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedHour: itemValue})}>
              {hourPickerValues}
            </Picker>
            <Text>:</Text>
            <Picker
              selectedValue={selectedMinute}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedMinute: itemValue})}>
              {minutePickerValues}
            </Picker>
          </View>
          <View style={style.button}>
            <Button block onPress={onConfirm(selectedHour, selectedMinute)}>
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
