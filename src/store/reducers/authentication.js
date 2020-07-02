import { userConstants } from '../actions/users';

const initialState = {
  signingIn: false
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        signingIn: true
      }
    case userConstants.LOGIN_SUCCESS:
      return { ...action.payload };
    case userConstants.LOGIN_FAILURE:
      return { error: action.payload };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
