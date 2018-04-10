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
    marginLeft: 10,
  },
  btnText: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  text: {
    margin: 10,
  },
}

export default class Home extends React.Component<Props, State> {

  render() {
    const { logout, username, token } = this.props;
    return (
      <View style={style.container}>
        <Text style={style.text}>Vous êtes présentement connnecter en tant que {username}</Text>
        <Button transparent onPress={logout} style={style.button}>
          <Text style={style.btnText}>Cliquer ici pour changer de compte</Text>
        </Button>
      </View>
    );
  }
}
