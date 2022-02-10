import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/authorization";

const GrepIUNav = () => {
  // user
  const {user: currentUser} = useSelector(state => state.authorization);
  // dispatch
  const dispatch = useDispatch();

  // 로그아웃
  const onLogout = () => {
    dispatch(logout())
  }
  return <>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/">GrepIU</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link as={Link} to="/about" className="text-white-50">소개</Nav.Link>
        <Nav.Link as={Link} to="/post" className="text-white-50">포스팅</Nav.Link>
        <Nav.Link as={Link} to="/toy" className="text-white-50">토이프로젝트</Nav.Link>
        <Nav.Link as={Link} to="/cloud" className="text-white-50">클라우드</Nav.Link>
        <Nav.Link as={Link} to="/admin" className="text-white-50">관리자</Nav.Link>
        <Nav.Link as={Link} to="/support" className="text-white-50">지원받기</Nav.Link>
        <Nav className="me-auto">
          <NavDropdown title={currentUser ? currentUser.id : '계정'}
                       id="basic-nav-dropdown">
            {
              currentUser ?
                  <NavDropdown.Item onClick={onLogout}>로그아웃</NavDropdown.Item> :
                  <>
                    <LinkContainer to="/login">
                      <NavDropdown.Item>로그인</NavDropdown.Item>
                    </LinkContainer>
                  </>
            }
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
}
export default GrepIUNav;
