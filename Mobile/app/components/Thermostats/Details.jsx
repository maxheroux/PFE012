// @flow
import * as React from 'react';
import { Form, Item, Label, Input, Button, Text, Spinner, List,
  ListItem, Body, Right, Container, Content, Footer } from 'native-base';
import { View, ScrollView } from 'react-native';
import shallowequal from 'shallowequal';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Header from '../../containers/Layout/Header';
import Manual from './Manual';
import ScheduleList from '../../containers/Scheduler/Scheduler';

type Props = {
  modifyThermostat: (targetTemp: string) => void,
  error: string,
  isFetching: boolean,
  nameList: Array<string>,
  currentTemperature: string,
  targetTemperature: string,
  currentHumidity: string,
};

type State = {
  selectedViewIndex: number,
};

const style = {
  content: {
    flexGrow: 1
  },
  modeSelection: {
    backgroundColor: 'white',
    padding: 10,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  modeText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  segment: {
    backgroundColor: 'white',
  },
  segmentText: {
    color: 'blue',
  },
  segmentContainer: {
  }
}

export default class Details extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedViewIndex: 0,// TODO: find value from back end
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.props.error !== nextProps.error ||
      this.props.isFetching !== nextProps.isFetching ||
      this.props.targetTemperature !== nextProps.targetTemperature ||
      this.props.currentHumidity !== nextProps.currentHumidity ||
      this.props.currentTemperature !== nextProps.currentTemperature ||
      this.state.selectedViewIndex !== nextState.selectedViewIndex ||
      !shallowequal(this.props.nameList, nextProps.nameList);
  }

  render() {
    const { selectedViewIndex } = this.state;

    let content = undefined;
    switch (selectedViewIndex) {
      case 1:
        const scheduleProps = {
          initialValues: []
        };
        content = <ScheduleList {...scheduleProps}/>;
        break;
      case 2:
        break;
      case 0:
      default:
        content = <Manual {...this.props}/>;
        break;
    }

    const modify = undefined;

    return (
      <Container>
        <Header title="Modifier thermo." goBackRoute="Main"/>
        <Content style={style.content}>
          {content}
        </Content>
        <View style={style.modeSelection}>
          <Text style={style.modeText}>Mode de contrôle </Text>
          <View style={style.segmentContainer}>
            <SegmentedControlTab
              values={['Manuel', 'Programmé', 'Automatique']}
              selectedIndex={selectedViewIndex}
              onTabPress={(index) => this.setState({selectedViewIndex: index})}
              />
          </View>
        </View>
      </Container>
    );
  }
}
