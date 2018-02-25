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
        header: (<Header title="Modifier thermo." goBackRoute="Main" />)
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
