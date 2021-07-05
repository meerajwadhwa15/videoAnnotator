import * as actions from './actions';
import { LoginState } from './types';

const loginHandler = {
  [actions.dispatchLogin.type](state: LoginState) {
    state.loading = true;
  },
  [actions.dispatchLoginSuccess.type](state: LoginState) {
    state.loading = false;
  },
  [actions.dispatchLoginFail.type](state: LoginState) {
    state.loading = false;
    state.error = 'login failed';
  },
};

export default loginHandler;
