import Header from "./Header";
import Footer from "./Footer";
import TopPage from "./TopPage";
import Teams from "./Teams";
import Ranking from "./Ranking";
import TeamDetailRoot from "./TeamDetailRoot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TopPage />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/team/:id" element={<TeamDetailRoot />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
