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
  const onLogin = () => {
    if (id && password) {
      dispatch(login(id, password)).then(() => {
        console.log('성공');
        return <Navigate to="/" replace/>
      }).catch(() => {
        console.log('실패');
      });
    }
  }

  if (currentUser) {
    return <Navigate to="/" replace/>
  }
  return <>
    <h1>#Login</h1>
    <div>
      <p>아래 로그인을 지원합니다.</p>
      <Container>
        <Row>
          <Col md="5">
            <Form.Control
                type="text"
                id="id"
                onChange={event => setId(event.target.value)}
                placeholder="아이디를 입력하여 주세요"
                value={id}
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Form.Control
                type="password"
                id="password"
                onChange={event => setPassword(event.target.value)}
                placeholder="비밀번호를 입력하여 주세요"
                value={password}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Button type="button" variant="primary" className="mb-3"
                      onClick={onLogin}>로그인</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </>
}

export default LoginForm;
