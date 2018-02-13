import { addNavigationHelpers } from 'react-navigation';
import { Navigator } from './index';

const initialPageAction = Navigator.router.getActionForPathAndParams('Home');
const initialState = Navigator.router.getStateForAction(initialPageAction);

export default function tabsNavReducer(state = initialState, action) {
  const nextState = Navigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
