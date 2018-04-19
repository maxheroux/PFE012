import * as React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';
import { map, filter } from 'lodash';
import type { alert } from './reducer';
import * as Actions from './actions';
import ListItem from '../../components/Alerts/ListItem';
import List from '../../components/Alerts/List';

type Props = {
  startAlertsListFetchInterval: () => void,
  markAlertsAsRead: () => void,
  error: string,
  isFetching: boolean,
  hasFetchedOnce: boolean,
  alerts: Array<alert>
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.alerts.list.error,
  isFetching: state.alerts.list.isFetching,
  hasFetchedOnce: state.alerts.list.hasFetchedOnce,
  alerts: state.alerts.list.list,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  startAlertsListFetchInterval: () => {
    dispatch(Actions.startAlertsListFetchInterval(undefined));
  },
  markAlertsAsRead: () => {

  }
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Alerts extends React.Component<Props, State> {

  componentWillMount() {
    this.props.startAlertsListFetchInterval();
  }

  render() {
    let { alerts, onCreate, onItemPress, hasFetchedOnce, markAlertsAsRead } = this.props;
    let listItems = map(alerts, (item, i) => {
      const props = {
        date: item.date,
        message: item.message,
        isRead: item.isRead,
        key: `alert#${i}`
      }
      return <ListItem {...props}/>;
    });
    if (!hasFetchedOnce) {
      listItems = [(
        <Spinner color='#777' key="alertSpinner"/>
      )];
    }

    const listProps = {
      markAlertsAsRead,
    }
    return (
      <List {...listProps}>
        {listItems}
      </List>
    );
  }
}
