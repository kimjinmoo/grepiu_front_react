import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

const GrepIUNav = () => <>
  <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Navbar.Brand href="/">GrepIU</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="/about">관하여...</Nav.Link>
      <Nav.Link href="/post">포스팅</Nav.Link>
      <Nav.Link href="/toy">토이프로젝트</Nav.Link>
      <Nav.Link href="/cloud">클라우드</Nav.Link>
      <Nav.Link href="/admin">관리자</Nav.Link>
      <Nav.Link href="/support">지원받기</Nav.Link>
      <Nav className="me-auto">
        <NavDropdown title="계정" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/login">로그인</NavDropdown.Item>
          <NavDropdown.Item href="#action/help">도움말</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</>
export default GrepIUNav;
