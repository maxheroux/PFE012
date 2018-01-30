import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from './actions';
import ServerSelectionComponent from '../../components/ServerSelection';
import { Container, Header, Title, Content, Body } from 'native-base';

const mapStateToProps = (state, ownProps) => ({
  error: state.serverSelectionReducer.error,
  id: state.serverSelectionReducer.id,
  content: state.serverSelectionReducer.content,
  serverUrl: state.serverSelectionReducer.serverUrl,
  name: state.serverSelectionReducer.name,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onConnectClick: (serverUrl, name) => {
    dispatch(Actions.requestTestServerConnection(serverUrl, name));
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ServerSelection extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Server Selection</Title>
          </Body>
        </Header>
        <Content>
          <ServerSelectionComponent {...this.props}/>
        </Content>
      </Container>
    );
  }
}
