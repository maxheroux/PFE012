// @flow
import React, { Component } from 'react';
import { View, Text } from 'native-base';
import shallowequal from 'shallowequal';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  name: string,
  color: string,
  brightness: number
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
  colorContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  color: (color) => ({
    flex: 1,
    alignItems: 'center',
    backgroundColor: color,
    alignSelf: 'flex-end',
    padding: 7,
    borderRadius: 7,
    minWidth: 90,
  })
};

export default class LightListItem extends Component<Props, State> {
  shouldComponentUpdate(nextProps, nextState){
    return !shallowequal(this.props, nextProps);
  }

  render() {
    const { name, color, brightness } = this.props;
    return (
      <View style={style.container}>
        <View style={style.textContainer}>
          <Text>{name}</Text>
          <Text note>Luminosité: {Math.round(brightness * 100) / 100}</Text>
        </View>
        <View style={style.colorContainer}>
          <View style={style.color(`#${color}`)}>
            <Text>#{color}</Text>
          </View>
        </View>
      </View>
    );
  }
}
