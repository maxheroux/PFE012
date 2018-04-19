// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner, List, ListItem, Body, Right } from 'native-base';
import { View, ScrollView } from 'react-native';
import shallowequal from 'shallowequal';
import { reduce } from 'lodash';
import Picker from 'rmc-picker';
import SegmentedControlTab from 'react-native-segmented-control-tab';

type Props = {
  updateTargetTemperature: (targetTemp: string) => void,
  error: string,
  isFetching: boolean,
  nameList: Array<string>,
  currentTemperature: string,
  targetTemperature: string,
  currentHumidity: string,
};

type State = {
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
  },
}

export default class Modify extends React.Component<Props, State> {

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.props.error !== nextProps.error ||
      this.props.isFetching !== nextProps.isFetching ||
      this.props.targetTemperature !== nextProps.targetTemperature ||
      this.props.currentHumidity !== nextProps.currentHumidity ||
      this.props.currentTemperature !== nextProps.currentTemperature ||
      !shallowequal(this.props.nameList, nextProps.nameList);
  }

  render() {
    const {
      error,
      isFetching,
      updateTargetTemperature,
      targetTemperature,
      currentTemperature,
      currentHumidity,
      nameList
    } = this.props;
    const errorMessage = error && (
      <Text style={style.error}>{error}</Text>
    );
    const names = reduce(
      nameList,
      (final, current, index) => index > 0 ? `${final}, ${current}` : current,
      '');
    let pickerValues = [];
    for (let i = 10; i < 40; i++) {
      pickerValues.push(
        <Picker.Item value={`${i}`} key={i}>
          {`${i}°C`}
        </Picker.Item>
        );
    }
    return (
      <ScrollView style={style.container}>
        <Picker
          selectedValue={targetTemperature}
          onValueChange={(itemValue, itemIndex) => updateTargetTemperature(itemValue)}>
          {pickerValues}
        </Picker>
        <List>
          <ListItem>
            <Body>
              <Text>Appareils selectionnés</Text>
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
        {isFetching && <Spinner color='rgb(90,200,250)' />}
      </ScrollView>
    );
  }
}
