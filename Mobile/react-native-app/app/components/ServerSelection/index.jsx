import * as React from 'react';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { View } from 'react-native';

export default class ServerSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverUrl: '127.0.0.1:8080/',
      name: 'Bob'
    };
  }

  render() {
    return (
      <View>
        <Form>
          <Item fixedLabel>
            <Label>Server URL</Label>
            <Input
              onChangeText={(serverUrl) => this.setState({serverUrl})}
              value={this.state.serverUrl}
              />
          </Item>
          <Item fixedLabel last>
            <Label>Name</Label>
            <Input
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              />
          </Item>
        </Form>
        <Button block>
          <Text>Soumettre</Text>
        </Button>
      </View>
  );
  }
}
