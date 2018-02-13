import { createLogic } from 'redux-logic';
import * as ConnectionConstants from '../Connection/constants';
import * as Actions from './actions';

export const login = createLogic({
  type: [ConnectionConstants.requestLogin, ConnectionConstants.requestRegister],
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch(Actions.goToMain);
    done();
  }
});
