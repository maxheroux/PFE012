import * as React from 'react';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { View } from 'react-native';

export default class ServerSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverUrl: props.serverUrl,
      name: props.name
    };
  }

  render() {
    const { error, id, content, onConnectClick } = this.props;
    const onPress = () => {
      onConnectClick(this.state.serverUrl, this.state.name);
    };
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
        <Button block onPress={onPress}>
          <Text>Soumettre</Text>
        </Button>
        <Text>error: {error}</Text>
        <Text>id: {id}</Text>
        <Text>content: {content}</Text>
      </View>
  );
  }
}
