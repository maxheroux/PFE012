import * as React from 'react';
import { TabNavigator, TabBarBottom, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Home';
import Thermostats from '../Thermostats';
import Lights from '../Lights';
import Locks from '../Locks';
import Cameras from '../Cameras';
import { addListener } from '../../../middleware';

export const Navigator = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Accueil'
      }
    },
    Thermostats: {
      screen: Thermostats,
      navigationOptions: {
        title: 'Thermostat'
      }
    },
    Lights: {
      screen: Lights,
      navigationOptions: {
        title: 'Lumières'
      }
    },
    Locks: {
      screen: Locks,
      navigationOptions: {
        title: 'Serrures'
      }
    },
    Cameras: {
      screen: Cameras,
      navigationOptions: {
        title: 'Caméras'
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName){
          case 'Home':
            iconName = `ios-home${focused ? '' : '-outline'}`;
            break;
          case 'Thermostats':
            iconName = `ios-thermometer${focused ? '' : '-outline'}`;
            break;
          case 'Lights':
            iconName = `ios-bulb${focused ? '' : '-outline'}`;
            break;
          case 'Locks':
            iconName = `ios-unlock${focused ? '' : '-outline'}`;
            break;
          case 'Cameras':
            iconName = `ios-videocam${focused ? '' : '-outline'}`;
            break;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'rgb(0,122,255)',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);

const mapStateToProps = state => ({
  nav: state.tabsNavigation,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class TabsNavigation extends React.Component {

  render() {
    const { dispatch, nav } = this.props;
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}
