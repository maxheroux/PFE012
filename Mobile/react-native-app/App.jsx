import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import ServerSelection from './app/containers/ServerSelection';
import { Font, AppLoading } from "expo";
import { Root } from "native-base";

const store = createStore(reducer, middleware);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    // Android ne supporte pas les fonts de la librairie de UI qu'on utilise par defaut.
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
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
          <ServerSelection />
        </Provider>
      </Root>
    );
  }
}
