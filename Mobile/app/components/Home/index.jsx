// @flow
import * as React from 'react';
import { Button, Text } from 'native-base';
import { View } from 'react-native';

type Props = {
  logout: () => void,
  username: string,
  token: string,
};

type State = {
};

const style = {
  container: {
    marginTop: 10
  },
  button: {
    margin: 10
  },
  text: {
    margin: 10
  },
}

export default class Home extends React.Component<Props, State> {

  render() {
    const { logout, username, token } = this.props;
    return (
      <View style={style.container}>
        <Text style={style.text}>Votre nom d'utilisateur: {username}</Text>
        <Text style={style.text}>Votre token: {token}</Text>
        <Button block onPress={logout} style={style.button}>
          <Text>Déconnexion</Text>
        </Button>
      </View>
    );
  }
}
