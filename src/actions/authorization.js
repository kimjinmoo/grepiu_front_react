import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT
} from './type';

import AuthService from '../services/auth.service';
import Store from '../helper/auth.store.utils';
import instance from "../services/httpClient";

// 로그인
export const login = (id, password) => (dispatch) => {
  return AuthService.login({
    id,
    password
  }).then(user => {
    if(user.code === 200) {
      let usr = Store.createUser(user);
      // 로컬에 저장한다.
      Store.save(usr);
      // 로그인 성공 처리
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: usr
        }
      })
    } else {
      dispatch({
        type: LOGIN_FAIL
      })

      return Promise.reject()
    }

    return Promise.resolve();
  }, err => {
    dispatch({
      type: LOGIN_FAIL
    })

    return Promise.reject()
  })
}

// 로그아웃
export const logout = () => (dispatch) => {
  return AuthService.logout().then(()=>{
    // 토큰을 삭제한다.
    Store.remove();
    // 로그아웃 로직
    dispatch({
      type: LOGOUT
    })
  });
}
