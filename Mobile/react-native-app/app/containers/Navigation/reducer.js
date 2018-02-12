import { addNavigationHelpers } from 'react-navigation';
import { AppNavigator } from './index';

const initialPageAction = AppNavigator.router.getActionForPathAndParams('Connection');
const initialState = AppNavigator.router.getStateForAction(initialPageAction);

export default function navReducer(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
