import * as React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import { Container, Header, Title, Left, Right, Body, Text } from 'native-base';
import Connection from '../Connection';
import TabsNavigation from '../TabsNavigation';
import { addListener } from '../../../middleware';

export const AppNavigator = StackNavigator(
  {
    Connection: {
      screen: Connection,
      navigationOptions: {
        header: (
          <Header>
            <Left/>
            <Body>
              <Title>Connnexion</Title>
            </Body>
            <Right />
          </Header>)
      }
    },
    Main: {
      screen: TabsNavigation,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    navigationOptions: {
      headerLeft: null
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
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Navigation extends React.Component {

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
