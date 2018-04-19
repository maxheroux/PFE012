// @flow
import * as React from 'react';
import { Text, Container, Spinner, ListItem, Left, Body, Right, Button } from 'native-base';
import { ScrollView, View } from 'react-native';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { map, some, filter } from 'lodash';
import { peripheralType } from '../../helpers/Peripheral/logic';

type Props = {
  onConfirm: (type: string) => void,
  onCancel: () => void,
  isVisible: boolean,
};

type State = {

};

const style = {
  button: {
    margin: 10
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  listItem: {
    height: 61,
  }
};

const types = [peripheralType.RFIDReader, peripheralType.RFIDTag, peripheralType.motionDetector, peripheralType.CODetector];

export default class PeripheralTypeSelector extends React.Component<Props, State> {

  render() {
    const { onConfirm, onCancel, isVisible } = this.props;

    const list = map(types, (type, index) => {
      return (
        <ListItem
          onPress={() => onConfirm(type)}
          key={`typeSelect${index}`}
          style={style.listItem}>
          <Body>
            <Text>{type}</Text>
          </Body>
        </ListItem>
      );
    });

    return (
      <Modal isVisible={isVisible}>
        <ScrollView>
          <View style={style.container}>
            {list}
            <View style={style.button}>
              <Button block transparent onPress={onCancel}>
                <Text>Annuler</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
