import * as React from 'react';
import { connect } from 'react-redux';
import { Text, Container } from 'native-base';
import { ScrollView } from 'react-native';
import Header from '../Layout/Header';
import * as ConnectionActions from '../Connection/actions';
import HomeComponent from '../../components/Home';
import * as NavigationActions from '../Navigation/actions';
import { StorageUtils } from '../../../utils';
import Alerts from '../Alerts/List';

const mapStateToProps = (state, ownProps) => ({
  username: state.connection.username,
  token: state.connection.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    StorageUtils.deleteConnectedUser()
      .catch(() => console.warn('Error deleting user info.'));
    dispatch(NavigationActions.goToConnection);
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <Header title="Accueil" />
        <ScrollView>
          <Alerts />
          <HomeComponent {...this.props}/>
        </ScrollView>
      </Container>
    );
  }
}
