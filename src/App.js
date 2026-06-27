import Header from "./Header";
import Footer from "./Footer";
import TopPage from "./TopPage";
import Teams from "./Teams";
import Ranking from "./Ranking";
import TeamDetailRoot from "./TeamDetailRoot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/auth/check/", {
        credentials: "include",
      });
      if (res.status === 403) {
        window.location.href = "/login/";
      }
    };
    // 初回表示
    checkAuth();
    // ブラウザバック時
    const handlePageShow = (event) => {
      if (event.persisted) {
        checkAuth();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/team/:id" element={<TeamDetailRoot />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
