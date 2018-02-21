// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import { View } from 'react-native';

type Props = {
  submitLogin: (string, string) => void,
  goToRegister: () => void,
  error: string,
  isFetching: boolean,
  username: string,
  password: string
};

type State = {
  username: string,
  password: string
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

export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: props.username,
      password: ''
    };
  }

  render() {
    const { error, submitLogin, isFetching, goToRegister } = this.props;
    const onSubmitPress = () => {
      submitLogin(this.state.username, this.state.password);
    };
    const onRegisterPress = () => {
      goToRegister();
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
        </Form>
        {errorMessage}
        <View style={style.button}>
          <Button block onPress={onSubmitPress} disabled={isFetching}>
            <Text>Soumettre</Text>
          </Button>
        </View>
        <View style={style.button}>
          <Button block transparent onPress={onRegisterPress}>
            <Text>Créer un compte</Text>
          </Button>
        </View>
        {isFetching && <Spinner color='blue' />}
      </View>
    );
  }
}
