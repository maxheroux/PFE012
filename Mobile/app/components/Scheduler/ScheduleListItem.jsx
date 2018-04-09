// @flow
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { map, some } from 'lodash';

type Props = {
  selectedDays: Array<number>,
  name: string,
  onClick: () => void,
};

type State = {
};

const dayText = {
  width: 30,
  color: 'white',
  borderColor: 'gray',
  borderWidth: 1,
  textAlign: 'center',
  marginLeft: 6,
  marginRight: 6,
  borderRadius: 5,
  padding: 2,
};
const style = {
  selectedDayText: {
    backgroundColor: 'rgb(0,122,255)',
    ...dayText,
  },
  unselectedDayText: {
    backgroundColor: 'lightgray',
    ...dayText,
  },
  daysContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  }
}

const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

export default class ScheduleListItem extends Component<Props, State> {

  render() {
    const { selectedDays, name, onClick } = this.props;
    const displayedDays = map(days, (day, index) => {
      const dayIsSelected = some(selectedDays, sd => sd == index);
      const usedStyle = dayIsSelected ? style.selectedDayText : style.unselectedDayText;
      return (
        <Text style={usedStyle} key={`jourHoraire${index}`}>
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
