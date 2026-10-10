import Header from "./Header";
import Footer from "./Footer";
import TopPage from "./TopPage";
import Teams from "./Teams";
import Ranking from "./Ranking";
import TeamDetailRoot from "./TeamDetailRoot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import RecordDetail from "./RecordDetail";
import RecordEdit from "./RecordEdit";
import Players from "./Players";
import { useState } from "react";
import ErrorModal from "./ErrorModal";
function App() {
  const [userName, setuserName] = useState(null);
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header userName={userName} />
        <Routes>
          <Route element={<ProtectedRoute setuserName={setuserName} />}>
            <Route path="/" element={<TopPage />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/team/:id" element={<TeamDetailRoot />} />
            <Route path="/record/:id" element={<RecordDetail />} />
            <Route path="/edit/record/:id" element={<RecordEdit />} />
            <Route path="/register" element={<Register />} />
            <Route path="/players/:teamid/:playerid" element={<Players />} />
            <Route
              path="*"
              element={
                <ErrorModal
                  errorMessage={
                    "404" + "," + "NotFound" + "," + "存在しないURLです"
                  }
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
