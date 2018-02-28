// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import { View, ScrollView } from 'react-native';

type Props = {
  submitThermostat: (name: string, bluetoothAddress: string) => void,
  error: string,
  isFetching: boolean,
};

type State = {
  name: string,
  bluetoothAddress: string,
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

export default class Create extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      bluetoothAddress: '',
    };
  }

  render() {
    const { error, isFetching, submitThermostat } = this.props;
    const onSubmitPress = () => {
      submitThermostat(this.state.name, this.state.bluetoothAddress);
    };
    const errorMessage = error && (
      <Text style={style.error}>{error}</Text>
    );
    const isValid = this.state.name && this.state.bluetoothAddress
    return (
      <ScrollView style={style.container}>
        <Form style={style.form}>
          <Item fixedLabel last>
            <Label>Nom de l'appareil</Label>
            <Input
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              autoCapitalize='none'
              />
          </Item>
          <Item fixedLabel last>
            <Label>Adresse Bluetooth</Label>
            <Input
              onChangeText={(bluetoothAddress) => this.setState({bluetoothAddress})}
              value={this.state.bluetoothAddress}
              autoCapitalize='none'
              />
          </Item>
        </Form>
        {errorMessage}
        <View style={style.button}>
          <Button block onPress={onSubmitPress} disabled={isFetching || !isValid}>
            <Text>Créer</Text>
          </Button>
        </View>
        {isFetching && <Spinner color='rgb(90,200,250)' />}
      </ScrollView>
    );
  }
}
