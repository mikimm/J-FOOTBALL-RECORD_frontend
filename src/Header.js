import "./Header.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function Header() {
  const LogoutAction = (e) => {
    const token = cookies.get("csrftoken");
    let target = "/logout/";

    fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
    })
      .then((response) => {
        console.log(response);
        window.location.href = response.url;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Navbar expand="lg" className="bg-black" data-bs-theme="dark">
      <Container style={{ padding: "0%" }}>
        <Navbar.Brand>J-FOOTBALL-RECORD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto alignment-nav">
            <Nav.Link
              as={NavLink}
              to="/"
              className="ms-lg-4" // Pサイズlgの時に左にマージンを空ける
              style={{
                color: "white",
                fontSize: "15px",
              }}
            >
              投稿一覧
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/ranking"
              className="ms-lg-4" // Pサイズlgの時に左にマージンを空ける
              style={{
                color: "white",
                fontSize: "15px",
              }}
            >
              順位表
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/teams"
              className="ms-lg-4" // Pサイズlgの時に左にマージンを空ける
              style={{
                color: "white",
                fontSize: "15px",
              }}
            >
              チーム一覧
            </Nav.Link>
            <NavDropdown
              title="mikihiro"
              id="collapsible-nav-dropdown"
              className="ms-lg-4"
              style={{ fontcolor: "white", width: "100px" }}
            >
              <NavDropdown.Item
                href="#action/3.1"
                style={{ fontcolor: "white" }}
              >
                プロフィール設定
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={LogoutAction}
                style={{ fontcolor: "white" }}
              >
                ログアウト
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
