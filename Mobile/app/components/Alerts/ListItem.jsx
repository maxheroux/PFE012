// @flow
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  date: string,
  message: string,
  isRead: boolean
};

type State = {
};

export default class AlertListItem extends Component<Props, State> {

  render() {
    const {
      date,
      message,
      isRead
    } = this.props;

    const color = isRead ? '#b5b5b5' : 'rgb(255, 59, 48)'

    return (
      <ListItem icon>
        <Left>
          <Ionicons
            name={'ios-warning'}
            size={30}
            color={color}/>
        </Left>
        <Body>
          <Text style={{color: color}}>
            {message}
          </Text>
          <Text note>
            {date}
          </Text>
        </Body>
      </ListItem>
    );
  }
}
