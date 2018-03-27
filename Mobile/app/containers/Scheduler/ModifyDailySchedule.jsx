// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, Container, Spinner } from 'native-base';
import { ScrollView } from 'react-native';
import { map, get, some, find, filter } from 'lodash';
import shallowequal from 'shallowequal';
import * as Actions from './actions';

type Props = {
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

@connect(mapStateToProps, mapDispatchToProps)
export default class PeripheralList extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <ScrollView>
          {content}
        </ScrollView>
      </Container>
    );
  }
}
