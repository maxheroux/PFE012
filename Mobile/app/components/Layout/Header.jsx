// @flow
import React, { Component } from 'react';
import { Header, Title, Left, Right, Button, Body } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  goBack: () => void,
  title: string
};

type State = {
};

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
    marginLeft: 10,
  },
}

export default class CustomHeader extends Component<Props, State> {
  render() {
    const { title, goBack } = this.props;
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
    return (
      <Header style={style.header}>
        {left}
        <Body style={style.body}>
          <Title style={style.title}>{title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
