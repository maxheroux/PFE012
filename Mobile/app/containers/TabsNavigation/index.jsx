import * as React from 'react';
import { TabNavigator, TabBarBottom, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Home';
import Thermostats from '../Thermostats';
import Lights from '../Lights';
import Locks from '../Locks';
import { addListener } from '../../../middleware';

const getTitleForRoute = (route) => {
  switch(route) {
    case 'Home':
      return 'Accueil';
    case 'Thermostats':
      return 'Thermostats';
    case 'Lights':
      return 'Lumières';
    case 'Locks':
      return 'Serrures';
  }
}

export const Navigator = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: getTitleForRoute('Home')
      }
    },
    Thermostats: {
      screen: Thermostats,
      navigationOptions: {
        title: getTitleForRoute('Thermostats')
      }
    },
    Lights: {
      screen: Lights,
      navigationOptions: {
        title: getTitleForRoute('Lights')
      }
    },
    Locks: {
      screen: Locks,
      navigationOptions: {
        title: getTitleForRoute('Locks')
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
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      header: {
        visible: true,
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
    const headerTitle = getTitleForRoute(nav.routes[nav.index].routeName);
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
