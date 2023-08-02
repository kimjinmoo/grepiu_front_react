import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {login} from "../../../actions/authorization";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const LoginForm = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const {user: currentUser} = useSelector(state => state.authorization);

  const dispatch = useDispatch();

  // 로그인
  const onLogin = event => {
    // 이벤트 전파 막기
    const form = event.preventDefault();
    if (id && password) {
      dispatch(login(id, password)).then(() => {
        return <Navigate to="/" replace/>
      }).catch(() => {
      });
    }
  }

  if (currentUser) {
    return <Navigate to="/" replace/>
  }
  return <Form onSubmit={onLogin}>
    <div className="text-center">
      <h1>#Login</h1>
      <p>아래 로그인을 지원합니다.</p>
    </div>
    <div className="d-flex justify-content-center">
      <div>
        <Form.Control
            type="text"
            id="id"
            className="mb-2"
            onChange={event => setId(event.target.value)}
            placeholder="아이디를 입력하여 주세요"
            style={{
              width: '350px'
            }}
            value={id}
        />
        <Form.Control
            type="password"
            id="password"
            className="mb-4"
            onChange={event => setPassword(event.target.value)}
            placeholder="비밀번호를 입력하여 주세요"
            value={password}
            style={{
              width: '350px'
            }}
            autoComplete="off"
        />
        <div className="text-center">
          <Button type="submit" variant="primary" className="mb-3"
                  style={{width: '350px'}}
                  onClick={onLogin}>로그인</Button>
        </div>
      </div>
    </div>
  </Form>
}

export default LoginForm;
