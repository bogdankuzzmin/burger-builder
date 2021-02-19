import {actionType} from '../actions';
import {updateObject} from '../utility';

const initialState = {
  loading: false,
  error: false,
};

const authStart = (state) => {
  return updateObject(state, {loading: true});
};

const authSuccess = (state, action) => {
  console.log(action.authData);
  return updateObject(state, {loading: false, authData: action.authData});
};

const authFail = (state, action) => {
  console.log(action);
  return updateObject(state, {loading: false, error: action.error});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START: return authStart(state);
    case actionType.AUTH_SUCCESS: return authSuccess(state, action);
    case actionType.AUTH_FAIL: return authFail(state, action);
    default: return state;
  }
};

export default reducer;
