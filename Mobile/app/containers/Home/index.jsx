import * as React from 'react';
import { Text } from 'native-base';
import { ScrollView } from 'react-native';
import Header from '../../components/Layout/Header';

export default class Home extends React.Component {
  render() {
    return (
      <ScrollView>
        <Header title="Accueil" />
        <Text>Home</Text>
      </ScrollView>
    );
  }
}
