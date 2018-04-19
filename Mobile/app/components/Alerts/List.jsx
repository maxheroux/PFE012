// @flow
import React, { Component } from 'react';
import { View, Text, List, Button } from 'native-base';

type Props = {
  children: any,
  markAlertsAsRead: () => void,
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
    marginBottom: 10,
    flex: 2,
  },
  noAlertText: {
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  buttonText: {
    textAlign: 'right',
  }
};

export default class AlertList extends Component<Props, State> {

  render() {
    const {
      children,
      markAlertsAsRead
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
        <View style={style.titleContainer}>
          <Text style={style.title}>
            Alertes récentes
          </Text>
          <View style={style.button}>
            <Button block transparent onPress={markAlertsAsRead}>
              <Text style={style.buttonText}>Marquer comme lues</Text>
            </Button>
          </View>
        </View>
        {content}
      </View>
    );
  }
}
