import * as React from 'react';
import { connect } from 'react-redux';
import { filter, map, meanBy } from 'lodash';
import tinycolor from 'tinycolor2';
import ModifyLightComponent from '../../components/Lights/Modify';
import * as Actions from './actions';

type Props = {
  modifyLight: (ids, color: string, brightness: string) => void,
  error: string,
  isFetching: boolean,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
  error: state.lights.modify.error,
  isFetching: state.lights.modify.isFetching,
  lightList: state.lights.list.list
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  modifyLight: (ids, color, brightness) => {
    dispatch(Actions.requestModifyLight(ids, color, brightness));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ModifyLight extends React.Component<Props, State> {

  render() {
    const { modifyLight, error, isFetching, lightList } = this.props;
    const { params } = this.props.navigation.state;
    const selectedIds = params ? params.itemIdList : [];
    const selectedItems = filter(lightList, (item) => selectedIds.includes(item.id));
    const avgRed = meanBy(selectedItems, i => tinycolor(i.color).toRgb().r);
    const avgGreen = meanBy(selectedItems, i => tinycolor(i.color).toRgb().g);
    const avgBlue = meanBy(selectedItems, i => tinycolor(i.color).toRgb().b);
    const childProps = {
      modifyLight: (color, brightness) => modifyLight(selectedIds, color, brightness),
      error,
      isFetching,
      nameList: map(selectedItems, i => i.name),
      color: tinycolor({ r: avgRed, g: avgGreen, b: avgBlue }).toHex(),
      brightness: Math.round(meanBy(selectedItems, i => i.brightness) * 100) / 100
    };
    return (
      <ModifyLightComponent {...childProps} />
    )
  }
}
