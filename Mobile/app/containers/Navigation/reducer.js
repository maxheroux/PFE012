import { AppNavigator } from './index';
import * as Actions from './actions';

const initialState = AppNavigator.router.getStateForAction(Actions.goToConnection);

export default function navReducer(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
