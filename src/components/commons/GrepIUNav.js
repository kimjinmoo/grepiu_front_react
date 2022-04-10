import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
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
    <Navbar bg="dark" variant="dark" expand="lg" sticky>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">GrepIU</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about" className="text-white-50">소개</Nav.Link>
            <Nav.Link as={Link} to="/post" className="text-white-50">포스팅</Nav.Link>
            <Nav.Link as={Link} to="/toy" className="text-white-50">토이프로젝트</Nav.Link>
            <Nav.Link as={Link} to="/cloud" className="text-white-50">클라우드</Nav.Link>
            {
              currentUser?.role === 'SUPER_ADMIN'?<Nav.Link as={Link} to="/admin" className="text-white-50">관리자</Nav.Link>:<></>
            }
            <Nav.Link as={Link} to="/support" className="text-white-50">지원받기</Nav.Link>
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
  </>
}
export default GrepIUNav;
