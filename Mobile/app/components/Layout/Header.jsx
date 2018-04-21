// @flow
import React, { Component } from 'react';
import { Header, Title, Left, Right, Button, Body, Text } from 'native-base';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  goBack: ?() => void,
  title: string,
  rightBtnText: ?string,
  rightBtnFn: ?() => void,
};

type State = {
};

const textSize = Platform.OS === 'ios' ? 16 : 14;

const style = {
  header: {
    backgroundColor: 'white',
  },
  body: {
    flex: 2,
  },
  title: {
    color: 'black',
  },
  btnIcon: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 16,
    width: 60
  },
  rightBtn: {
    color: 'rgb(0,122,255)',
    fontSize: textSize,
    paddingLeft: 0,
    paddingRight: 0
  }
}

export default class CustomHeader extends Component<Props, State> {
  render() {
    const { title, goBack, rightBtnText, rightBtnFn } = this.props;
    const left = goBack ? (
        <Left>
          <Button iconLeft transparent onPress={goBack} style={style.btnIcon}>
            <Ionicons
              name={'ios-arrow-back'}
              size={25}
              color={'black'}/>
          </Button>
        </Left>
      ) : <Left />;
    const right = rightBtnText ? (
      <Right>
        <Button small transparent
          onPress={rightBtnFn}>
          <Text style={style.rightBtn}>{rightBtnText}</Text>
        </Button>
      </Right>
    ) : <Right />
    return (
      <Header style={style.header}>
        {left}
        <Body style={style.body}>
          <Title style={style.title}>{title}</Title>
        </Body>
        {right}
      </Header>
    );
  }
}
