// @flow
import React, { Component } from 'react';
import { Container, Header, Title, Left, Right, Body, Text } from 'native-base';

type Props = {
  title: string
};

type State = {
};

const style = {
  header: {
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
  }
}

export default class CustomHeader extends Component<Props, State> {
  render() {
    const { title } = this.props;
    return (
      <Header style={style.header}>
        <Left />
        <Body>
          <Title style={style.title}>{title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
