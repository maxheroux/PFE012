// @flow
import * as React from 'react';
import { Text, Container, Spinner, ListItem, Left, Body, Right, Button } from 'native-base';
import { ScrollView, View } from 'react-native';
import Modal from "react-native-modal";
import Picker from 'rmc-picker';

type Props = {
  onConfirm: (hour: number, temperature: number) => void,
  onCancel: () => void,
  isVisible: boolean,
};

type State = {
  selectedHour: number,
  selectedTemperature: number,
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
  pickersContainer: {
    flex: 1,
    flexDirection: 'row',
  }
}

let hourPickerValues = [];
for (let i = 0; i < 24; i++) {
  hourPickerValues.push(
    <Picker.Item value={`${i}`} key={i}>
      {`${i}:00`}
    </Picker.Item>
    );
}

let tempPickerValues = [];
for (let i = 10; i < 40; i++) {
  tempPickerValues.push(
    <Picker.Item value={`${i}`} key={i}>
      {`${i}°C`}
    </Picker.Item>
    );
}

export default class TimeTempSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedHour: 12,
      selectedTemperature: 25,
    };
  }

  render() {
    const { onConfirm, onCancel, isVisible } = this.props;
    const { selectedHour, selectedTemperature } = this.state;

    return (
      <Modal isVisible={isVisible}>
        <ScrollView>
          <View style={style.container}>
            <View style={style.pickersContainer}>
              <Picker
                selectedValue={selectedTemperature}
                onValueChange={(itemValue, itemIndex) => this.setState({selectedTemperature: itemValue})}>
                {tempPickerValues}
              </Picker>
              <Text> à </Text>
              <Picker
                selectedValue={selectedHour}
                onValueChange={(itemValue, itemIndex) => this.setState({selectedHour: itemValue})}>
                {hourPickerValues}
              </Picker>
            </View>
            <View style={style.button}>
              <Button block onPress={() => onConfirm(selectedHour, selectedTemperature)}>
                <Text>Confirmer</Text>
              </Button>
            </View>
            <View style={style.button}>
              <Button block transparent onPress={onCancel}>
                <Text>Annuler</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
