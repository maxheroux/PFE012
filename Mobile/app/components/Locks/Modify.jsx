// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner, List, ListItem, Body, Right} from 'native-base';
import { View, ScrollView } from 'react-native';
import shallowequal from 'shallowequal';
import { reduce } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  modifyLock: (isLocked: boolean) => void,
  error: string,
  isFetching: boolean,
  nameList: Array<string>,
  isLocked: boolean,
};

type State = {
  newIsLocked: boolean,
};

const style = {
  container: {
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
  iconContainer: {
    height: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBtn: {
    flex: 1,
    height: 300,
    alignSelf: 'center',
  }
}

export default class Modify extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newIsLocked: props.isLocked,
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.props.error !== nextProps.error ||
      this.props.isFetching !== nextProps.isFetching ||
      this.props.isLocked !== nextProps.isLocked ||
      this.state.newIsLocked !== nextState.newIsLocked ||
      !shallowequal(this.props.nameList, nextProps.nameList);
  }

  render() {
    const {
      error,
      isFetching,
      modifyLock,
      isLocked,
      nameList
    } = this.props;
    const { newIsLocked } = this.state;
    const onSubmitPress = () => {
      modifyLock(newIsLocked);
    };
    const toggleLock = () => {
      this.setState({
        newIsLocked: !newIsLocked
      });
    }
    const errorMessage = error && (
      <Text style={style.error}>{error}</Text>
    );
    const names = reduce(
      nameList,
      (final, current, index) => index > 0 ? `${final}, ${current}` : current,
      '');

    const lockIconColor = newIsLocked ? 'gray' : 'rgb(0,122,255)';
    const lockIconName = newIsLocked ? 'ios-lock' : 'ios-unlock';

    return (
      <ScrollView style={style.container}>
        <View style={style.iconContainer}>
          <Button small transparent onPress={toggleLock} style={style.lockBtn}>
            <Ionicons name={lockIconName} size={300} color={lockIconColor} />
          </Button>
        </View>
        <List>
          <ListItem>
            <Body>
              <Text>Appareils selectionnés</Text>
              <Text note>{names}</Text>
            </Body>
          </ListItem>
        </List>
        {errorMessage}
        <View style={style.button}>
          <Button block onPress={onSubmitPress} disabled={isFetching}>
            <Text>Modifier</Text>
          </Button>
        </View>
        {isFetching && <Spinner color='rgb(90,200,250)' />}
      </ScrollView>
    );
  }
}
