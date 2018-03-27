// @flow
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { map, some } from 'lodash';

type Props = {
  selectedDays: Array<number>,
  name: string,
  onClick: () => {},
};

type State = {
};

const style = {
  selectedDayText: {
    backgroundColor: 'rgb(90, 200, 250)',
    width: 20,
  },
  unselectedDayText: {
    backgroundColor: 'lightgrey',
    width: 20,
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
  }
}

const days = ['d', 'l', 'm', 'm', 'j', 'v', 's'];

export default class ScheduleListItem extends Component<Props, State> {

  render() {
    const { selectedDays, name, onClick } = this.props;
    const displayedDays = map(days, (day, index) => {
      const dayIsSelected = some(selectedDays, sd => sd == index);
      const usedStyle = dayIsSelected ? style.selectedDayText : style.unselectedDayText;
      return (
        <Text style={usedStyle}>
          {day}
        </Text>
      );
    });

    return (
      <ListItem onPress={onClick}>
        <Body>
          <Text>
            {name}
          </Text>
          <View style={style.daysContainer}>
            {displayedDays}
          </View>
        </Body>
        <Right>
          <Ionicons name="ios-arrow-forward" size={25} color="#b5b5b5"/>
        </Right>
      </ListItem>
    );
  }
}
