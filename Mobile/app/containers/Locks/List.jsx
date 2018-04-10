import * as React from 'react';
import { connect } from 'react-redux';
import { map, filter } from 'lodash';
import List from '../PeripheralList';
import ListItem from '../../components/Locks/ListItem';
import type { lock } from './reducer';
import * as Actions from './actions';
import * as NavigationActions from '../Navigation/actions';

type Props = {
  requestLocksList: () => void,
  onCreate: () => void,
  onModify: (itemIdList: Array<number>, locks: Array<lock>) => {},
  error: string,
  isFetching: boolean,
  hasFetchedOnce: boolean,
  locks: Array<lock>
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.locks.list.error,
  isFetching: state.locks.list.isFetching,
  hasFetchedOnce: state.locks.list.hasFetchedOnce,
  locks: state.locks.list.list,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestLocksList: () => {
    dispatch(Actions.requestLocksList());
  },
  onCreate: () => {
    dispatch(NavigationActions.goToCreateLock);
  },
  onModify: (itemIndexList, locks) => {
    // transform list indexes into peripheral ids
    const selectedItems = filter(locks, (item, id) => itemIndexList.includes(id));
    const selectedIds = map(selectedItems, i => i.id);
    dispatch(NavigationActions.goToModifyLock(selectedIds));
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Locks extends React.Component<Props, State> {

  componentWillMount() {
    this.props.requestLocksList();
  }

  render() {
    let { locks, onCreate, onModify, onItemPress, hasFetchedOnce } = this.props;
    let listItems = map(locks, (item, i) => {
      const props = {
        name: item.name,
        isLocked: item.isLocked,
        key: i
      }
      return <ListItem {...props}/>;
    });

    const listProperties = {
      title: 'Serrures',
      listId: 'Locks',
      hasFetchedOnce,
      onCreate,
      onModify: (itemIndexList) => onModify(itemIndexList, locks),
      onItemPress: (itemIndex) => onModify([itemIndex], locks),
      isEditable: true,
    }
    return (
      <List {...listProperties}>
        {listItems}
      </List>
    );
  }
}
