// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import { View, ScrollView } from 'react-native';
import PeripheralTypeSelector from './PeripheralTypeSelector';
import { peripheralType } from '../../helpers/Peripheral/logic';

type Props = {
  submitPeripheral: (
    name: string,
    bluetoothAddress: string,
    type: string,
    identificator: string) => void,
  error: string,
  isFetching: boolean,
};

type State = {
  name: string,
  bluetoothAddress: string,
  identificator: string,
  type: string,
  isTypeSelectorOpen: boolean,
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
  },
  typeContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
  },
  type: {
    flex: 2,
  }
}

export default class Create extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      bluetoothAddress: '',
      type: '',
      identificator: '',
      isTypeSelectorOpen: false,
    };
  }

  render() {
    const { error, isFetching, submitPeripheral } = this.props;
    const { isTypeSelectorOpen } = this.state;
    const onSubmitPress = () => {
      submitPeripheral(
        this.state.name,
        this.state.bluetoothAddress,
        this.state.type,
        this.state.identificator
      );
    };
    const errorMessage = error && (
      <Text style={style.error}>{error}</Text>
    );
    const isValid = this.state.type == peripheralType.RFIDTag ?
      this.state.type && this.state.identificator :
      this.state.name && this.state.bluetoothAddress && this.state.type;

    const typeSelectorProps = {
      onConfirm: (type) => {
        this.setState({
          isTypeSelectorOpen: false,
          type
        });
      },
      onCancel: () => this.setState({ isTypeSelectorOpen: false }),
      isVisible: isTypeSelectorOpen,
    }

    const changingFields = this.state.type == peripheralType.RFIDTag ? (
      <Item fixedLabel last>
        <Label>Identificateur</Label>
        <Input
          onChangeText={(identificator) => this.setState({identificator})}
          value={this.state.identificator}
          autoCapitalize='none'
          />
      </Item>
    ) : (
      <View>
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
      </View>
    );

    return (
      <ScrollView style={style.container}>
        <Form style={style.form}>
          <Item fixedLabel last onPress={() => this.setState({ isTypeSelectorOpen: true })}>
            <Label>Type du périphérique</Label>
            <Text style={style.type}>
              {this.state.type}
            </Text>
            <PeripheralTypeSelector
              {...typeSelectorProps}
              />
          </Item>
          {changingFields}
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
