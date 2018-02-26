// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, Container } from 'native-base';
import { ScrollView } from 'react-native';
import { map, get, some, find, filter } from 'lodash';
import shallowequal from 'shallowequal';
import * as Actions from './actions';
import type { Item } from './reducer';
import Header from '../../components/PeripheralList/Header';
import ListItem from '../../components/PeripheralList/ListItem';

type ExternalProps = {
  children: any,
  title: string,
  listId: string,
  onCreate: () => void,
  onModify: (itemIdList: Array<number>) => {},
  onItemPress: (itemId: number) => {}
}

type ReducerProps = {//TODO: selected items
  isInSelectionMode: boolean,
  items: Array<Item>,
  enterSelectionMode: (nbChildren: number) => void,
  exitSelectionMode: () => void,
  selectAll: () => void,
  selectNone: () => void,
  toggleSelected: (itemId: number) => void
}

type Props = {
  ...ExternalProps,
  ...ReducerProps
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  items: get(find(state.peripheralList.lists, {'listId': ownProps.listId}), 'items', []),
  isInSelectionMode: get(find(state.peripheralList.lists, {'listId': ownProps.listId}), 'isInSelectionMode', false)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSelected: (itemId) =>
    dispatch(Actions.toggleSelected(ownProps.listId, itemId)),
  selectAll: () =>
    dispatch(Actions.selectAll(ownProps.listId)),
  selectNone: () =>
    dispatch(Actions.selectNone(ownProps.listId)),
  enterSelectionMode: (nbChildren: number) =>
    dispatch(Actions.enterSelectionMode(ownProps.listId, nbChildren)),
  exitSelectionMode: () =>
    dispatch(Actions.exitSelectionMode(ownProps.listId)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class PeripheralList extends React.Component<Props, State> {
  shouldComponentUpdate(nextProps, nextState){
    return this.props.children !== nextProps.children ||
      this.props.title !== nextProps.title ||
      this.props.listId !== nextProps.listId ||
      this.props.isInSelectionMode !== nextProps.isInSelectionMode ||
      !shallowequal(this.props.items, nextProps.items);
  }

  render() {
    const {
      children,
      title,
      isInSelectionMode,
      items,
      onCreate,
      onModify,
      onItemPress,
      toggleSelected,
      selectAll,
      selectNone,
      enterSelectionMode,
      exitSelectionMode,
    } = this.props;

    const headerProps = {
      title,
      isSelecting: isInSelectionMode,
      hasSelectedItems: some(items, i => i.isSelected),
      create: onCreate,
      enterSelectionMode: () => enterSelectionMode(children.length),
      exitSelectionMode,
      confirmSelection: () => onModify(map(filter(items, i => i.isSelected), i => i.itemId)),
      selectAll,
      selectNone
    };

    const listItems = map(children, (child, index) => {
      const listItemProperties = {
        key: index,
        isInSelectionMode,
        isSelected: some(items, i => i.itemId == index && i.isSelected),
        goToDetails: () => onItemPress(index),
        toggleSelected: () => toggleSelected(index)
      }
      return (
        <ListItem {...listItemProperties}>
          {child}
        </ListItem>
      );
    });

    return (
      <Container>
        <Header {...headerProps}/>
        <ScrollView>
          {listItems}
        </ScrollView>
      </Container>
    );
  }
}
