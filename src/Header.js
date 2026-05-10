import "./Header.css";
import Nav from "react-bootstrap/Nav";
function Header() {
  return (
    <header>
      <Nav.Link
        href={"/"}
        style={{
          color: "white",
          fontSize: "25px",
          display: "inline-block",
        }}
      >
        J-FOOTBALL-RECORD
      </Nav.Link>
      <Nav.Link
        href={"/"}
        style={{
          marginLeft: "30%",
          color: "white",
          fontSize: "15px",
          display: "inline-block",
        }}
      >
        投稿一覧
      </Nav.Link>
      <h1 className="app-ranking-menue">順位表</h1>
      <Nav.Link
        href={"/teams"}
        style={{
          marginLeft: "5%",
          color: "white",
          fontSize: "15px",
          display: "inline-block",
        }}
      >
        チーム一覧
      </Nav.Link>
      <h1 className="app-user-menue">
        <img className="profile_icon" src="images/profile_icon.png" />
        mikihiro
      </h1>
      <h1 className="app-logout-menue">ログアウト</h1>
    </header>
  );
}

export default Header;
