import * as React from 'react';
import { Text } from 'native-base';
import { ScrollView } from 'react-native';
import List from '../../components/Thermostats/List';

export default class Home extends React.Component {
  render() {
    return (
      <ScrollView>
        <List/>
      </ScrollView>
    );
  }
}
