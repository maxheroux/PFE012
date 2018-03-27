// @flow
import React, { Component } from 'react';
import { Container, Header, Title, Left, Right, Body, Text, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

type Props = {
  title: string,
  create: () => void,
};

type State = {
};

const style = {
  header: {
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
  },
}

export default class ScheduleHeader extends Component<Props, State> {
  render() {
    const {
      title,
      create,
    } = this.props;

    return (
      <Header style={style.header}>
        <Left>
        </Left>
        <Body>
          <Title style={style.title}>{title}</Title>
        </Body>
        <Right>
          <Button small transparent onPress={create}>
            <Ionicons name="ios-add" size={35} color="rgb(0,122,255)" />
          </Button>
        </Right>
      </Header>
    );
  }
}
