import * as React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import List from '../PeripheralList';
import ListItem from '../../components/Thermostats/ListItem';
import type { thermostat } from './reducer';
import * as Actions from './actions';
import * as NavigationActions from '../Navigation/actions';

type Props = {
  requestThermostatsList: () => void,
  onCreate: () => {},
  onModify: () => {},
  onItemPress: (itemId: number) => {},
  error: string,
  isFetching: boolean,
  thermostats: Array<thermostat>
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.thermostats.list.error,
  isFetching: state.thermostats.list.isFetching,
  thermostats: state.thermostats.list.list,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestThermostatsList: () => {
    dispatch(Actions.requestThermostatsList());
  },
  onCreate: () => {
    dispatch(NavigationActions.goToCreateThermostat);
  },
  onModify: () => {
    dispatch(NavigationActions.goToModifyThermostat);
  },
  onItemPress: (itemId) => {
    dispatch(NavigationActions.goToModifyThermostat);
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Thermostats extends React.Component<Props, State> {
  componentWillMount() {
    this.props.requestThermostatsList();
  }

  render() {
    const { thermostats, onCreate, onModify, onItemPress } = this.props;
    let listItems = map(thermostats, (item, i) => {
      const props = {
        name: item.name,
        currentTemp: item.currentTemp,
        targetTemp: item.targetTemp,
        currentHumidity: item.currentHumidity,
        key: i
      }
      return <ListItem {...props}/>;
    });

    const listProperties = {
      title: 'Thermostats',
      listId: 'Thermostats',
      onCreate,
      onModify,
      onItemPress
    }
    return (
      <List {...listProperties}>
        {listItems}
      </List>
    );
  }
}
