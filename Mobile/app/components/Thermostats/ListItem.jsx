// @flow
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
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
      <ListItem>
        <Body>
          <Text>{name}</Text>
          <Text note>Temp. courante/cible: {currentTemp}/{targetTemp}</Text>
          <Text note>Humidité courante/cible: {currentHumidity}/{targetHumidity}</Text>
        </Body>
        <Right>
          <Ionicons name="ios-arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}
