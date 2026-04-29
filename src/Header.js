import "./Header.css";
function Header() {
  return (
    <header>
      <h1 className="app-title">J-FOOTBALL-RECORD</h1>
      <h1 className="app-record-list-menue">投稿一覧</h1>
      <h1 className="app-ranking-menue">順位表</h1>
      <h1 className="app-team-list-menue">チーム一覧</h1>
      <h1 className="app-user-menue">
        <img className="profile_icon" src="images/profile_icon.png" />
        mikihiro
      </h1>
      <h1 className="app-logout-menue">ログアウト</h1>
    </header>
  );
}

export default Header;
