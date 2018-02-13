// @flow
import React, { Component } from 'react';
import { List } from 'native-base';
import ListItem from './ListItem';

type Props = {
};

type State = {
};

export default class ListeThermostat extends Component<Props, State> {
  render() {
    let listItems = [];
    for (let i =0; i < 10; i++){
      const props = {
        name: `Thermostat ${i}`,
        currentTemp: `${20 + i}`,
        targetTemp: `${25 + i}`,
        currentHumidity: `${50 + i}`,
        targetHumidity: `${30 + i}`,
        key: i
      }
      listItems.push(<ListItem {...props}/>);
    }
    return (
      <List>
        {listItems}
      </List>
    );
  }
}
