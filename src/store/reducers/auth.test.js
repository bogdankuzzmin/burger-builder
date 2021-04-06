import reducer from './auth';
import {actionType} from '../actions';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      userEmail: null,
      loading: false,
      error: null,
      authRedirectPath: '/'
    });
  });

  it('should store the token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      userEmail: null,
      loading: false,
      error: null,
      authRedirectPath: '/'
  }, {
    type: actionType.AUTH_SUCCESS,
    idToken: 'some-token',
    userId: 'some-user-id',
    userEmail: 'some-email',
  })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      userEmail: 'some-email',
      loading: false,
      error: null,
      authRedirectPath: '/'
    }, )
  });
});
