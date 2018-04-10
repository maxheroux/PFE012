// @flow
import React, { Component } from 'react';
import { View, Text } from 'native-base';
import shallowequal from 'shallowequal';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string,
  type: string,
};

type State = {
};

const style = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
};

export default class OtherPeripheralListItem extends Component<Props, State> {
  shouldComponentUpdate(nextProps, nextState){
    return !shallowequal(this.props, nextProps);
  }

  render() {
    const { name, type } = this.props;
    return (
      <View style={style.container}>
        <View style={style.textContainer}>
          <Text>{name} ({type})</Text>
        </View>
      </View>
    );
  }
}
