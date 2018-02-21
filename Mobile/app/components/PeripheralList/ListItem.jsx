// @flow
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  children: any,
  isInSelectionMode: boolean,
  isSelected: boolean,
  goToDetails: () => void,
  toggleSelected: () => void
};

type State = {
};

const style = {
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIcon: {
    marginRight: 15,
    alignSelf: 'center',
  }
}

export default class PeripheralListItem extends Component<Props, State> {
  render() {
    const {
      children,
      isInSelectionMode,
      isSelected,
      goToDetails,
      toggleSelected
    } = this.props;

    let left = null;
    let right = (
      <Right>
        <Ionicons name="ios-arrow-forward" size={25} color="#b5b5b5"/>
      </Right>
    );

    if (isInSelectionMode) {
      left = (
        <Button iconLeft transparent onPress={toggleSelected} style={style.btnIcon}>
          <Ionicons
            name={isSelected ? 'ios-checkmark-circle' : 'ios-radio-button-off'}
            size={30}
            color={isSelected ? 'rgb(0,122,255)' : '#b5b5b5'}/>
        </Button>
      );
      right = null;
    }

    return (
      <ListItem onPress={isInSelectionMode ? toggleSelected : goToDetails}>
        <Body style={style.body}>
          {left}
          {children}
        </Body>
        {right}
      </ListItem>
    );
  }
}
