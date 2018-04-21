// @flow
import React, { Component } from 'react';
import { View, Text } from 'native-base';
import shallowequal from 'shallowequal';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string,
  isLocked: boolean,
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
  lockContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
};

export default class LightListItem extends Component<Props, State> {
  shouldComponentUpdate(nextProps, nextState){
    return !shallowequal(this.props, nextProps);
  }

  render() {
    const { name, isLocked } = this.props;
    const lockIconColor = isLocked ? 'gray' : 'rgb(0,122,255)';
    const lockIconName = isLocked ? 'ios-lock' : 'ios-unlock';
    return (
      <View style={style.container}>
        <View style={style.textContainer}>
          <Text>{name}</Text>
        </View>
        <View style={style.lockContainer}>
          <Ionicons name={lockIconName} size={25} color={lockIconColor} />
        </View>
      </View>
    );
  }
}
