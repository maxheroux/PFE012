import * as React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import Connection from '../Connection';
import TabsNavigation from '../TabsNavigation';
import { addListener } from '../../../middleware';

export const AppNavigator = StackNavigator(
  {
    Connection: {
      screen: Connection,
      navigationOptions: {
        title: 'Connexion'
      }
    },
    Main: {
      screen: TabsNavigation,
      navigationOptions: {
        title: 'Main'
      }
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
