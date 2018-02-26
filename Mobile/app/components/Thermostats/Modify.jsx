// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import { View } from 'react-native';
import { reduce } from 'lodash';

type Props = {
  modifyThermostat: (targetTemp: string) => void,
  error: string,
  isFetching: boolean,
  nameList: string,
  currentTemperature: string,
  targetTemperature: string
};

type State = {
  newTargetTemperature: string,
};

const style = {
  container: {
    marginTop: 10
  },
  namesContainer: {
    marginLeft: 15,
    marginRight: 15
  },
  names: {
    marginTop: 2,
    fontSize: 15
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

export default class Modify extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newTargetTemperature: props.targetTemperature,
    };
  }

  render() {
    const {
      error,
      isFetching,
      modifyThermostat,
      targetTemperature,
      currentTemperature,
      nameList
    } = this.props;
    const onSubmitPress = () => {
      modifyThermostat(this.state.newTargetTemperature);
    };
    const errorMessage = error && (
      <Text style={style.error}>{error}</Text>
    );
    const names = reduce(
      nameList,
      (final, current, index) => index > 0 ? `${final}, ${current}` : current,
      '');
    return (
      <View style={style.container}>
        <View style={style.namesContainer}>
          <Label>Appareils selectionner: </Label>
          <Text style={style.names}>{names}</Text>
          <Label>Température courante: {currentTemperature}</Label>
        </View>
        <Form style={style.form}>
          <Item fixedLabel last>
            <Label>Température cible</Label>
            <Input
              onChangeText={(newTargetTemperature) => this.setState({newTargetTemperature})}
              value={`${this.state.newTargetTemperature}`}
              keyboardType='numeric'
              returnKeyType='done'
              />
          </Item>
        </Form>
        {errorMessage}
        <View style={style.button}>
          <Button block onPress={onSubmitPress} disabled={isFetching}>
            <Text>Soumettre</Text>
          </Button>
        </View>
        {isFetching && <Spinner color='rgb(90,200,250)' />}
      </View>
    );
  }
}
