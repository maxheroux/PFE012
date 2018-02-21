import * as React from 'react';
import List from '../PeripheralList';
import ListItem from '../../components/Thermostats/ListItem';

export default class Thermostats extends React.Component {
  render() {
    let listItems = [];
    for (let i =0; i < 10; i++){
      const props = {
        name: `Thermostat ${i}`,
        currentTemp: `${20 + i}`,
        targetTemp: `${25 + i}`,
        currentHumidity: `${50 + i}`,
        targetHumidity: `${30 + i}`,
        key: i
      }
      listItems.push(<ListItem {...props}/>);
    }

    const listProperties = {
      title: 'Thermostats',
      listId: 'Thermostats',
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
