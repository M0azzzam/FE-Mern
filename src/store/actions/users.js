import * as userService from '../../services/users';
import { setAuth } from '../../utils/auth';
import history from '../../history';
import Toast from '../../components/extension/Toast';
import axios from '../../axios';
import { objectifyPermissions } from '../../utils/helpers'

export const userConstants = {
  REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',
  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
  LOGOUT: 'USERS_LOGOUT'
}


export const userActions = {
  register,
  login,
  logout
};

function register(user) {
  return async dispatch => {
    try {
      dispatch(request(user));
      const result = await userService.register(user);

      dispatch(success(result.data.data));
      setAuth(result.data.data.token);
      history.replace('/onboarding');
      Toast(
        'Registration completed!',
        'Your account has been created.',
        'success'
      );
    } catch (err) {
      console.log(err.response);
      Toast(
        'Something went wrong.',
        'Please make sure your have provided correct information.',
        'danger'
      );
      dispatch(failure('Something went wrong.'));
    }
  }

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, payload: user }
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, payload: user }
  };
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, payload: error }
  };
}

function login(user) {
  return async dispatch => {
    try {
      dispatch(request(user));
      const result = await userService.login(user);
      if (result.data.role) {
        result.data.role.permissions = objectifyPermissions(result.data.role.permissions);
      }
      dispatch(success(result.data));
      setAuth(result.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
      history.replace('/app/dashboard');
      Toast(
        'Login successfully.',
        'You are now logged in.',
        'success'
      );
    } catch (err) {
      console.log(err.response);
      Toast(
        'Something went wrong.',
        'Please make sure your have provided correct information.',
        'danger'
      );
      dispatch(failure('Something went wrong.'));
    }
  }

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, payload: user }
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, payload: user }
  };
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, payload: error }
  };
}

function logout() {
  return dispatch => {
    dispatch(request());
    userService.logout();
    function request() {
      return { type: userConstants.LOGOUT }
    }
  }
}
