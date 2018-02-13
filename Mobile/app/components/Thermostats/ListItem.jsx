// @flow
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

type Props = {
  name: string,
  currentTemp: string,
  targetTemp: string,
  currentHumidity: string,
  targetHumidity: string,
  actif: bool
};

type State = {
};

export default class ThermoListItem extends Component<Props, State> {
  render() {
    const { name, currentTemp, targetTemp, currentHumidity, targetHumidity, actif } = this.props;
    return (
      <ListItem>
        <Body>
          <Text>{name}</Text>
          <Text note>Temp. courante/cible: {currentTemp}/{targetTemp}</Text>
          <Text note>Humidité courante/cible: {currentHumidity}/{targetHumidity}</Text>
        </Body>
        <Right>
          <Text>{actif ? 'actif' : 'inactif'}</Text>
        </Right>
      </ListItem>
    );
  }
}
