import * as React from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { ScrollView } from 'react-native';
import * as Actions from './actions';
import * as Constants from './constants';
import Login from '../../components/Connection/login';
import Register from '../../components/Connection/register';

const mapStateToProps = (state, ownProps) => ({
  error: state.connection.error,
  isFetching: state.connection.isFetching,
  displayedScreen: state.connection.displayedScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitLogin: (username, password) => {
    dispatch(Actions.requestLogin(username, password));
  },
  submitRegister: (username, password, publicIp, port) => {
    dispatch(Actions.requestRegister(username, password, publicIp, port));
  },
  goToRegister: () =>
    dispatch(Actions.goToRegister()),
  goToLogin: () =>
    dispatch(Actions.gotToLogin()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ConnectionSelection extends React.Component {
  render() {
    const { displayedScreen } = this.props;
    let form;
    switch(displayedScreen){
      case Constants.screens.register:
        form = (
          <Register {...this.props}/>
        );
        break;
      default:
        form = (
          <Login {...this.props}/>
        );
        break;
    };
    return (
      <ScrollView>
        {form}
      </ScrollView>
    );
  }
}
