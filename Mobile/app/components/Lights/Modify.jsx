// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner, List, ListItem, Body, Right} from 'native-base';
import { View, ScrollView } from 'react-native';
import shallowequal from 'shallowequal';
import { reduce } from 'lodash';
import { HueSlider, SaturationSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';

type Props = {
  modifyLight: (color: string, brightness: string) => void,
  error: string,
  isFetching: boolean,
  nameList: Array<string>,
  color: string,
  brightness: string,
};

type State = {
  newColor: string,
  newBrightness: string,
};

const style = {
  container: {
  },
  form: {
    marginBottom: 10
  },
  colorInput: (color) => ({
    backgroundColor: color,
    fontSize: 60,
    fontWeight: 'bold',
    height: 150,
    textAlignVertical: 'center',
  }),
  slider: {
    width: '100%'
  },
  button: {
    margin: 10
  },
  error: {
    color: 'red',
    margin: 10,
    textAlign: 'center'
  }
}

export default class Modify extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newColor: props.color,
      newBrightness: props.brightness,
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.props.error !== nextProps.error ||
      this.props.isFetching !== nextProps.isFetching ||
      this.props.color !== nextProps.color ||
      this.props.brightness !== nextProps.brightness ||
      this.state.newColor !== nextState.newColor ||
      this.state.newBrightness !== nextState.newBrightness ||
      !shallowequal(this.props.nameList, nextProps.nameList);
  }

  render() {
    const {
      error,
      isFetching,
      modifyLight,
      color,
      brightness,
      nameList
    } = this.props;
    const onSubmitPress = () => {
      modifyLight(this.state.newColor, this.state.newBrightness);
    };
    const updateHue = (h: number) => {
      this.setState({
        newColor: tinycolor({ h: h, s: 100, l: 50 }).toHex()
      });
    }
    const errorMessage = error && (
      <Text style={style.error}>{error}</Text>
    );
    const names = reduce(
      nameList,
      (final, current, index) => index > 0 ? `${final}, ${current}` : current,
      '');
    return (
      <ScrollView style={style.container}>
        <Input
          style={style.colorInput(`#${this.state.newColor}`)}
          onChangeText={(newColor) => this.setState({newColor})}
          value={this.state.newColor}
          autoCapitalize='none'
          textAlign={'center'}
          />
        <List>
          <ListItem>
            <HueSlider
              style={style.slider}
              gradientSteps={40}
              value={tinycolor(this.state.newColor).toHsl().h}
              onValueChange={updateHue}
            />
          </ListItem>
          <ListItem>
            <Body>
              <Text>Luminosité</Text>
              <SaturationSlider
                style={style.slider}
                gradientSteps={40}
                value={this.state.newBrightness}
                color={tinycolor(this.state.newColor).toHsl()}
                onValueChange={(newBrightness) => this.setState({newBrightness})}
              />
            </Body>
          </ListItem>
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
