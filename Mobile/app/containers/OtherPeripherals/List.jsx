import * as React from 'react';
import { connect } from 'react-redux';
import { map, filter } from 'lodash';
import List from '../PeripheralList';
import ListItem from '../../components/OtherPeripherals/ListItem';
import type { otherPeripheral } from './reducer';
import * as Actions from './actions';
import * as NavigationActions from '../Navigation/actions';

type Props = {
  requestOtherPeripheralsList: () => void,
  onCreate: () => void,
  error: string,
  isFetching: boolean,
  hasFetchedOnce: boolean,
  otherPeripherals: Array<otherPeripheral>
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.otherPeripherals.list.error,
  isFetching: state.otherPeripherals.list.isFetching,
  hasFetchedOnce: state.otherPeripherals.list.hasFetchedOnce,
  otherPeripherals: state.otherPeripherals.list.list,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestOtherPeripheralsList: () => {
    dispatch(Actions.requestOtherPeripheralsList());
  },
  onCreate: () => {
    dispatch(NavigationActions.goToCreateOtherPeripheral);
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class OtherPeripherals extends React.Component<Props, State> {

  componentWillMount() {
    this.props.requestOtherPeripheralsList();
  }

  render() {
    let { otherPeripherals, onCreate, onItemPress, hasFetchedOnce } = this.props;
    let listItems = map(otherPeripherals, (item, i) => {
      const props = {
        name: item.name,
        type: item.type,
        key: i
      }
      return <ListItem {...props}/>;
    });

    const listProperties = {
      title: 'Capteurs',
      listId: 'OtherPeripherals',
      hasFetchedOnce,
      onCreate,
      onModify: undefined,
      onItemPress: undefined,
      isEditable: false,
    }
    return (
      <List {...listProperties}>
        {listItems}
      </List>
    );
  }
}
