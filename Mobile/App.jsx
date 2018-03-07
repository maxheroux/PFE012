import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware, { logicMiddleware } from './middleware';
import { Font, AppLoading } from "expo";
import { Root } from "native-base";
import { StackNavigator } from 'react-navigation';

import Navigation from './app/containers/Navigation';
import { StorageUtils } from './utils';

const store = createStore(reducer, middleware);
logicMiddleware.addDeps({
  dispatch: store.dispatch
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      connectedUser: undefined
    };
  }

  async componentWillMount() {
    // Android ne supporte pas les fonts de la librairie de UI qu'on utilise par defaut.
    const results = await Promise.all([
      Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      }),
      StorageUtils.getConnectedUser()
    ]);
    this.setState({
      loading: false,
      connectedUser: results[1]
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }
    return (
      <Root>
        <Provider store={store}>
          <Navigation connectedUser={this.state.connectedUser}/>
        </Provider>
      </Root>
    );
  }
}
