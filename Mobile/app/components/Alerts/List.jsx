// @flow
import React, { Component } from 'react';
import { View, Text, List } from 'native-base';

type Props = {
  children: any
};

type State = {
};

const style = {
  container: {
    padding: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
  },
  noAlertText: {
    textAlign: 'center',
  }
};

export default class AlertList extends Component<Props, State> {

  render() {
    const {
      children
    } = this.props;

    let content = undefined;
    let containerStyle = style.container;
    if (children && children.length > 0) {
      content = (
        <List>
          {children}
        </List>
      )
    } else {
      content = (
        <Text style={style.noAlertText}>
          Vous n'avez reçu aucune alerte.
        </Text>
      )
      containerStyle = {
        ...containerStyle,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      }
    }

    return (
      <View style={containerStyle}>
        <Text style={style.title}>
          Alertes récentes
        </Text>
        {content}
      </View>
    );
  }
}
