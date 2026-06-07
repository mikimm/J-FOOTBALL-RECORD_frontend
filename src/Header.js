import "./Header.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { useState } from "react";
function Header() {
  return (
    <Navbar expand="lg" className="bg-black" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>J-FOOTBALL-RECORD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              width: "100%",
            }}
          >
            <Nav.Link
              as={NavLink}
              to="/"
              style={{
                color: "white",
                fontSize: "15px",
                display: "inline-block",
              }}
            >
              投稿一覧
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/ranking"
              style={{
                marginLeft: "5%",
                color: "white",
                fontSize: "15px",
                display: "inline-block",
              }}
            >
              順位表
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/teams"
              style={{
                marginLeft: "5%",
                color: "white",
                fontSize: "15px",
                display: "inline-block",
              }}
            >
              チーム一覧
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/"
              style={{
                marginLeft: "5%",
                color: "white",
                fontSize: "15px",
                display: "inline-block",
              }}
            >
              ログアウト
            </Nav.Link>
            <NavDropdown
              title="mikihiro"
              id="collapsible-nav-dropdown"
              style={{ color: "white", marginLeft: "5%" }}
            >
              <NavDropdown.Item href="#action/3.1">
                プロフィール設定
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">ログアウト</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
