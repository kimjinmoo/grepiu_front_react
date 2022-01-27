// 회원가입
import axios from "axios";
import instance from "./httpClient";

// 화원가입
const signUp = async ({
  id,
  password
}) => {
  return null;
}

// 로그인
const login = async ({
  id,
  password
}) => {
  let url = 'https://conf.grepiu.com/oauth/login';
  const response = await axios.post(url, {
    id: id,
    password: password
  });

  return response.data;
}

// 로그아웃
const logout = async () => {
  const response = await instance.post('/oauth/logout')
  return response.data;
}

export default {
  signUp,
  login,
  logout
}
