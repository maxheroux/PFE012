// @flow
import React, { Component } from 'react';
import { Container, Header, Title, Left, Right, Body, Text, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

type Props = {
  title: string,
  isSelecting: boolean,
  hasSelectedItems: boolean,
  create: () => void,
  enterSelectionMode: () => void,
  exitSelectionMode: () => void,
  confirmSelection: () => void,
  selectAll: () => void,
  selectNone: () => void
};

type State = {
};

const textSize = Platform.OS === 'ios' ? 16 : 14;
const paddingTop = Platform.OS === 'ios' ? 0 : 5;

const style = {
  header: {
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
  },
  btnText: {
    color: 'rgb(0,122,255)',
    fontSize: textSize,
    paddingLeft: 0,
    paddingRight: 0
  },
  cancelBtnText: {
    color: 'rgb(255,59,48)',
    fontSize: textSize,
    paddingLeft: 0,
    paddingRight: 0
  },
  btnTextDisabled: {
    color: '#b5b5b5'
  },
  btnDisabled: {
    backgroundColor: 'transparent'
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: paddingTop
  },
  enterSelectionModeBtn: {
    marginTop: paddingTop
  }
}

export default class PeripheralHeader extends Component<Props, State> {
  render() {
    const {
      title,
      isSelecting,
      hasSelectedItems,
      create,
      enterSelectionMode,
      exitSelectionMode,
      confirmSelection,
      selectAll,
      selectNone
    } = this.props;

    let confirmSelectionBtnTextStyle = style.btnText;
    let confirmSelectionBtnStyle;
    if(!hasSelectedItems){
      confirmSelectionBtnTextStyle = {
        ...confirmSelectionBtnTextStyle,
        ...style.btnTextDisabled
      };
      confirmSelectionBtnStyle = style.btnDisabled;
    }


    if (isSelecting) {
      return (
        <Header style={style.header}>
          <Left style={style.btnsContainer}>
            <Button small transparent onPress={selectAll}>
              <Text style={style.btnText}>Tous</Text>
            </Button>
            <Button small transparent onPress={selectNone}>
              <Text style={style.btnText}>Aucun</Text>
            </Button>
            <Button small transparent onPress={exitSelectionMode}>
              <Text style={style.cancelBtnText}>Annuler</Text>
            </Button>
          </Left>
          <Right style={style.btnsContainer}>
            <Button small transparent
              onPress={confirmSelection}
              disabled={!hasSelectedItems}
              style={confirmSelectionBtnStyle}>
              <Text style={confirmSelectionBtnTextStyle}>Modifier</Text>
            </Button>
          </Right>
        </Header>
      );
    }
    return (
      <Header style={style.header}>
        <Left>
          <Button small transparent onPress={enterSelectionMode} style={style.enterSelectionModeBtn}>
            <Text style={style.btnText}>Modifier</Text>
          </Button>
        </Left>
        <Body>
          <Title style={style.title}>{title}</Title>
        </Body>
        <Right>
          <Button small transparent onPress={create}>
            <Ionicons name="ios-add" size={35} color="rgb(0,122,255)" />
          </Button>
        </Right>
      </Header>
    );
  }
}
