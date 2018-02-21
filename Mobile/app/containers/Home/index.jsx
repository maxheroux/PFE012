import * as React from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { ScrollView } from 'react-native';
import Header from '../../components/Layout/Header';
import * as ConnectionActions from '../Connection/actions';
import HomeComponent from '../../components/Home';
import * as NavigationActions from '../Navigation/actions';

const mapStateToProps = (state, ownProps) => ({
  username: state.connection.username,
  token: state.connection.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(NavigationActions.goToConnection);
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component {
  render() {
    return (
      <ScrollView>
        <Header title="Accueil" />
        <HomeComponent {...this.props}/>
      </ScrollView>
    );
  }
}
