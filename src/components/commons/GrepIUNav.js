import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/authorization";
import styled from "styled-components";

const Wrapper = styled.div`
  .nav.navbar-nav.navbar-right li a {
    color: blue;
  }
`;

const GrepIUNav = () => {
  // user
  const {user: currentUser} = useSelector(state => state.authorization);
  // dispatch
  const dispatch = useDispatch();

  // 로그아웃
  const onLogout = () => {
    dispatch(logout())
  }
  return <Wrapper>
    <Navbar collapseOnSelect bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-toggle">GrepIU</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">소개</Nav.Link>
            <Nav.Link as={Link} to="/post">포스팅</Nav.Link>
            <NavDropdown title="토이프로젝트" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/toy">한방! 로또</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/toy">Grep Place</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/toy">배틀 히어로</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/toy">투표 만들기</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/cloud">클라우드</Nav.Link>
            {
              currentUser?.role === 'SUPER_ADMIN'?<Nav.Link as={Link} to="/admin" className="text-white-50">관리자</Nav.Link>:<></>
            }
            <Nav.Link as={Link} to="/support">지원받기</Nav.Link>
          </Nav>
          {
            currentUser ?
                <Navbar.Text onClick={onLogout}><div style={{
                  cursor: 'pointer'
                }}>로그아웃</div></Navbar.Text> :
                <>
                  <LinkContainer to="/login" style={{
                    cursor: 'pointer'
                  }}>
                    <Navbar.Text>로그인</Navbar.Text>
                  </LinkContainer>
                </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </Wrapper>
}
export default GrepIUNav;
