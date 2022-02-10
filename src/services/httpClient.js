import axios from "axios";
import Store from '../helper/auth.store.utils';

// 공통 http client
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}`,
  headers: {
    "Content-Type": "application/json",
  },
});
// 요청
instance.interceptors.request.use(function (config) {
  let user = Store.read();
  // 유저값이 존재 하면 header에 토큰을 등록한다.
  if (user) {
    const token = user.accessToken;
    config.headers.Authorization = `Bearer ${token}`;

  }
  return config;
});
// 응답
instance.interceptors.response.use(response => response, error => {
  return Promise.reject(error);
})

export default instance;
