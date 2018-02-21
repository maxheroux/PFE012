// @flow
import React, { Component } from 'react';
import { View, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string,
  currentTemp: string,
  targetTemp: string,
  currentHumidity: string,
  targetHumidity: string
};

type State = {
};

export default class ThermoListItem extends Component<Props, State> {
  render() {
    const { name, currentTemp, targetTemp, currentHumidity, targetHumidity } = this.props;
    return (
      <View>
        <Text>{name}</Text>
        <Text note>Temp. courante/cible: {currentTemp}/{targetTemp}</Text>
        <Text note>Humidité courante/cible: {currentHumidity}/{targetHumidity}</Text>
      </View>
    );
  }
}
