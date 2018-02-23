import * as React from 'react';
import { Text } from 'native-base';
import List from '../PeripheralList';

export default class Locks extends React.Component {
  render() {
    let listItems = [];
    for (let i =0; i < 10; i++){
      listItems.push((
        <Text key={i}>
          Serrure #{i}
        </Text>
      ));
    }

    const listProperties = {
      title: 'Serrures',
      listId: 'Serrures',
      onCreate: () => {},
      onModify: () => {},
      onItemPress: (itemId) => {}
    }
    return (
      <List {...listProperties}>
        {listItems}
      </List>
    );
  }
}
