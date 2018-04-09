import * as React from 'react';
import { connect } from 'react-redux';
import { filter, map, meanBy } from 'lodash';
import ModifyLockComponent from '../../components/Locks/Modify';
import * as Actions from './actions';

type Props = {
  modifyLock: (ids, isLocked: boolean) => void,
  error: string,
  isFetching: boolean,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.locks.modify.error,
  isFetching: state.locks.modify.isFetching,
  lockList: state.locks.list.list
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  modifyLock: (ids, isLocked) => {
    dispatch(Actions.requestModifyLock(ids, isLocked));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ModifyLock extends React.Component<Props, State> {

  render() {
    const { modifyLock, error, isFetching, lockList } = this.props;
    const { params } = this.props.navigation.state;
    const selectedIds = params ? params.itemIdList : [];
    const selectedItems = filter(lockList, (item) => selectedIds.includes(item.id));

    const isLocked = meanBy(selectedItems, i => i.isLocked ? 1 : 0) >= 0.5;

    const childProps = {
      modifyLock: (isLocked) => modifyLock(selectedIds, isLocked),
      error,
      isFetching,
      nameList: map(selectedItems, i => i.name),
      isLocked: isLocked,
    };
    return (
      <ModifyLockComponent {...childProps} />
    )
  }
}
