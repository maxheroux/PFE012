import * as React from 'react';
import { connect } from 'react-redux';
import { map, filter } from 'lodash';
import List from '../PeripheralList';
import ListItem from '../../components/Lights/ListItem';
import type { light } from './reducer';
import * as Actions from './actions';
import * as NavigationActions from '../Navigation/actions';

type Props = {
  requestLightsList: () => void,
  onCreate: () => {},
  onModify: (itemIdList: Array<number>, lights: Array<light>) => {},
  error: string,
  isFetching: boolean,
  lights: Array<thermostat>
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.lights.list.error,
  isFetching: state.lights.list.isFetching,
  lights: state.lights.list.list,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestLightsList: () => {
    dispatch(Actions.requestLightsList());
  },
  onCreate: () => {
    dispatch(NavigationActions.goToCreateLight);
  },
  onModify: (itemIndexList, lights) => {
    // transform list indexes into peripheral ids
    const selectedItems = filter(lights, (item, id) => itemIndexList.includes(id));
    const selectedIds = map(selectedItems, i => i.id);
    dispatch(NavigationActions.goToModifyLight(selectedIds));
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Lights extends React.Component<Props, State> {
  componentWillMount() {
    this.props.requestLightsList();
  }

  render() {
    let { lights, onCreate, onModify, onItemPress } = this.props;
    let listItems = map(lights, (item, i) => {
      const props = {
        name: item.name,
        color: item.color,
        brightness: item.brightness,
        key: i
      }
      return <ListItem {...props}/>;
    });

    const listProperties = {
      title: 'Lights',
      listId: 'Lights',
      onCreate,
      onModify: (itemIndexList) => onModify(itemIndexList, lights),
      onItemPress: (itemIndex) => onModify([itemIndex], lights)
    }
    return (
      <List {...listProperties}>
        {listItems}
      </List>
    );
  }
}
