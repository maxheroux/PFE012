// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import { View } from 'react-native';

type Props = {
  submitRegister: (string, string, string, string) => void,
  goToLogin: () => void,
  error: string,
  isFetching: boolean,
  username: string,
  password: string,
  publicIp: string,
  port: string
};

type State = {
  username: string,
  password: string,
  publicIp: string,
  port: string
};

const style = {
  container: {
    marginTop: 10
  },
  form: {
    marginBottom: 10
  },
  button: {
    margin: 10
  },
  error: {
    color: 'red',
    margin: 10,
    textAlign: 'center'
  }
}

export default class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: props.username,
      password: '',
      publicIp: '',
      port: ''
    };
  }

  render() {
    const { error, submitRegister, isFetching, goToLogin } = this.props;
    const onSubmitPress = () => {
      submitRegister(this.state.username, this.state.password, this.state.publicIp, this.state.port);
    };
    const onLoginPress = () => {
      goToLogin();
    };
    const errorMessage = error && (
      <Text style={style.error}>{error}</Text>
    );
    return (
      <View style={style.container}>
        <Form style={style.form}>
          <Item fixedLabel last>
            <Label>Nom d'utilisateur</Label>
            <Input
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
              autoCapitalize='none'
              />
          </Item>
          <Item fixedLabel last>
            <Label>Mot de passe</Label>
            <Input
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              secureTextEntry
              />
          </Item>
          <Item fixedLabel last>
            <Label>IP publique</Label>
            <Input
              onChangeText={(publicIp) => this.setState({publicIp})}
              value={this.state.publicIp}
              />
          </Item>
          <Item fixedLabel last>
            <Label>Port</Label>
            <Input
              onChangeText={(port) => this.setState({port})}
              value={this.state.port}
              keyboardType="numeric"
              />
          </Item>
        </Form>
        {errorMessage}
        <View style={style.button}>
          <Button block onPress={onSubmitPress} disabled={isFetching}>
            <Text>Soumettre</Text>
          </Button>
        </View>
        <View style={style.button}>
          <Button block transparent onPress={onLoginPress}>
            <Text>Connexion avec un compte existant</Text>
          </Button>
        </View>
        {isFetching && <Spinner color='rgb(90,200,250)' />}
      </View>
  );
  }
}
