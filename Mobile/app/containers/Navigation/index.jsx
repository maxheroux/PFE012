import * as React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import Connection from '../Connection';
import TabsNavigation from '../TabsNavigation';
import { addListener } from '../../../middleware';
import Header from '../Layout/Header';
import * as ConnectionActions from '../Connection/actions';
import CreateThermostat from '../Thermostats/Create';
import ModifyThermostat from '../Thermostats/Modify';
import CreateLight from '../Lights/Create';
import ModifyLight from '../Lights/Modify';
import CreateLock from '../Locks/Create';
import ModifyLock from '../Locks/Modify';
import CreateOtherPeripheral from '../OtherPeripherals/Create';
import DailySchedule from '../Scheduler/DailySchedule';

export const AppNavigator = StackNavigator(
  {
    Connection: {
      screen: Connection,
      navigationOptions: {
        header: (<Header title="Connexion"/>),
        headerLeft: null
      }
    },
    Main: {
      screen: TabsNavigation,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    },
    CreateThermostat: {
      screen: CreateThermostat,
      navigationOptions: {
        header: (<Header title="Créer thermo." goBackRoute="Main" />)
      }
    },
    ModifyThermostat: {
      screen: ModifyThermostat,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    },
    CreateLight: {
      screen: CreateLight,
      navigationOptions: {
        header: (<Header title="Créer lumière" goBackRoute="Main" />)
      }
    },
    ModifyLight: {
      screen: ModifyLight,
      navigationOptions: {
        header: (<Header title="Modifier lumière" goBackRoute="Main" />)
      }
    },
    CreateLock: {
      screen: CreateLock,
      navigationOptions: {
        header: (<Header title="Créer serrure" goBackRoute="Main" />)
      }
    },
    ModifyLock: {
      screen: ModifyLock,
      navigationOptions: {
        header: (<Header title="Modifier serrure" goBackRoute="Main" />)
      }
    },
    CreateOtherPeripheral: {
      screen: CreateOtherPeripheral,
      navigationOptions: {
        header: (<Header title="Créer capteur" goBackRoute="Main" />)
      }
    },
    DailySchedule: {
      screen: DailySchedule,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    }
  },
  {
    navigationOptions: {
    },
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);

const mapStateToProps = state => ({
  nav: state.navigation,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Navigation extends React.Component {
  componentWillMount() {
    const user = this.props.connectedUser;
    if(user){
      this.props.dispatch(ConnectionActions.successfulLogin(user.username, user.token))
    }
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}
