// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner, List, ListItem, Body, Right} from 'native-base';
import { View, Picker } from 'react-native';
import { reduce } from 'lodash';

type Props = {
  modifyThermostat: (targetTemp: string) => void,
  error: string,
  isFetching: boolean,
  nameList: string,
  currentTemperature: string,
  targetTemperature: string,
  currentHumidity: string,
};

type State = {
  newTargetTemperature: string,
};

const style = {
  container: {
    marginTop: 10
  },
  form: {
    marginBottom: 10
  },
  button: {
    margin: 10
  },
  error: {
    color: 'red',
    margin: 10,
    textAlign: 'center'
  }
}

export default class Modify extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newTargetTemperature: props.targetTemperature,
    };
  }

  render() {
    const {
      error,
      isFetching,
      modifyThermostat,
      targetTemperature,
      currentTemperature,
      currentHumidity,
      nameList
    } = this.props;
    const onSubmitPress = () => {
      modifyThermostat(this.state.newTargetTemperature);
    };
    const errorMessage = error && (
      <Text style={style.error}>{error}</Text>
    );
    const names = reduce(
      nameList,
      (final, current, index) => index > 0 ? `${final}, ${current}` : current,
      '');
    let pickerValues = [];
    for(let i = 10; i < 40; i++){
      pickerValues.push(<Picker.Item label={`${i}°C`} value={i} key={i} />);
    }
    return (
      <View style={style.container}>
        <Picker
          selectedValue={this.state.newTargetTemperature}
          onValueChange={(itemValue, itemIndex) => this.setState({newTargetTemperature: itemValue})}>
          {pickerValues}
        </Picker>
        <List>
          <ListItem>
            <Body>
              <Text>Appareils selectionner</Text>
              <Text note>{names}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Température courante</Text>
            </Body>
            <Right>
              <Text>{currentTemperature}°C</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Humidité courante</Text>
            </Body>
            <Right>
              <Text>{currentHumidity}%</Text>
            </Right>
          </ListItem>
        </List>
        {errorMessage}
        <View style={style.button}>
          <Button block onPress={onSubmitPress} disabled={isFetching}>
            <Text>Soumettre</Text>
          </Button>
        </View>
        {isFetching && <Spinner color='rgb(90,200,250)' />}
      </View>
    );
  }
}
