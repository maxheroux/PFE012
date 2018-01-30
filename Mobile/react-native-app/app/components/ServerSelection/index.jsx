import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
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
    const { error, id, content, onConnectClick, isFetching } = this.props;
    const onPress = () => {
      onConnectClick(this.state.serverUrl, this.state.name);
    };
    const message = error || content && `id: ${id}, content: ${content}`;
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
        <Button block onPress={onPress} disabled={isFetching}>
          <Text>Soumettre</Text>
        </Button>
        <Text>{message}</Text>
        {isFetching && <Spinner color='blue' />}
      </View>
  );
  }
}
