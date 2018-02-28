import * as React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../../components/Layout/Header';
import * as NavigationActions from '../Navigation/actions';

type Props = {
  goBack: () => void,
  goBackRoute: string,
  title: string
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  goBack: () => {
    dispatch(NavigationActions.goToRoute(ownProps.goBackRoute));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component<Props, State> {

  render() {
    const childProps = {
      goBack: this.props.goBackRoute && this.props.goBack,
      title: this.props.title
    }
    return (
      <HeaderComponent {...childProps} />
    )
  }
}
