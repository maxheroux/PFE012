import { createLogic } from 'redux-logic';
import * as ConnectionConstants from '../Connection/constants';
import * as Actions from './actions';

export const login = createLogic({
  type: [ConnectionConstants.successfulLogin, ConnectionConstants.successfulRegister],
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch(Actions.goToMain);
    done();
  }
});
