// @flow
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { View } from 'react-native';

type Props = {
  hour: number,
  temperature: number,
  name: string,
};

type State = {
};

export default class DailyScheduleListItem extends Component<Props, State> {

  render() {
    const { hour, temperature, name } = this.props;

    return (
      <ListItem>
        <Body>
          <Text>
            {name}
          </Text>
          <Text>
            {temperature}°C à {hour}:00
          </Text>
        </Body>
      </ListItem>
    );
  }
}
