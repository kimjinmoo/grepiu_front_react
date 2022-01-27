import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from '../actions/type';
import Store from '../helper/auth.store.utils';

// 인증 처리
const user = Store.read();

const initialState = user ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user}

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
