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
import type { modify as ModificationStatus } from '../../containers/Thermostats/reducer';

type Props = {
  saveChanges: (modeIndex) => void,
  updateTargetTemperature: () => void,
  updateSchedule: (newSchedule) => void,
  nameList: Array<string>,
  currentTemperature: string,
  targetTemperature: string,
  currentHumidity: string,
  modificationStatus: ModificationStatus,
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
      this.props.modificationStatus !== nextProps.modificationStatus ||
      this.state.selectedViewIndex !== nextState.selectedViewIndex ||
      !shallowequal(this.props.nameList, nextProps.nameList);
  }

  render() {
    const {
      saveChanges,
      updateTargetTemperature,
      updateSchedule,
      nameList,
      currentTemperature,
      targetTemperature,
      currentHumidity,
      modificationStatus
    } = this.props;
    const { selectedViewIndex } = this.state;

    let content = undefined;
    switch (selectedViewIndex) {
      case 1:
        const scheduleProps = {
          schedules: modificationStatus.schedules.list,
          error: modificationStatus.error || modificationStatus.schedules.error,
          isFetching: modificationStatus.isFetching || modificationStatus.schedules.isFetching,
          updateSchedule,
        };
        content = <ScheduleList {...scheduleProps}/>;
        break;
      case 2:
        content = (
          <Text style={{margin: 15}}>
            Le mode automatique gère automatiquement les températures des thermostats sélectionnés.
          </Text>
        );
        break;
      case 0:
      default:
        const manualProps = {
          error: modificationStatus.error,
          isFetching: modificationStatus.isFetching,
          updateTargetTemperature,
          nameList,
          currentTemperature,
          targetTemperature,
          currentHumidity,
        }
        content = <Manual {...this.props}/>;
        break;
    }

    const modify = undefined;

    return (
      <Container>
        <Header
          title="Modifier thermo."
          goBackRoute="Main"
          rightBtnText="OK"
          rightBtnFn={() => saveChanges(selectedViewIndex)}
        />
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
